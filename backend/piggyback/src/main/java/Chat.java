import static spark.Spark.*;

public class Chat {
    public static HandleCommand handleCommand;
    public static MarkerDatabase markerDatabase = new MarkerDatabase();
    public static ChatDataBase chatDataBase = new ChatDataBase();
    public static WSCallback wsCallback = new WSCallback();

    public static void main(String[] args) {
        staticFiles.location("/public"); //index.html is served at localhost:4567 (default port)
        staticFiles.expireTime(600);
        CommandDispatcher.registerCommand("ChatMessage", (user, command) -> {
            chatDataBase.receiveChatCommand(command);
            System.out.println("Message: " + command.data);
            CommandDispatcher.sendCommand(command.targetIdx, command);
        });
        CommandDispatcher.registerCommand("ChatRequest", (user, command) -> {
            command.messages = chatDataBase.jsonArray(chatDataBase.getMessages(command.userIdx, command.targetIdx));
            System.out.println("Request: " + command.data);
            CommandDispatcher.sendCommand(command.userIdx, command);
        });
        CommandDispatcher.registerCommand("ChatsAvailable", (user, command) -> {
            command.messages = chatDataBase.jsonArray(chatDataBase.getChats(command.userIdx));
            System.out.println("Available: " + command.data);
            CommandDispatcher.sendCommand(command.userIdx, command);
        });
        CommandDispatcher.registerCommand("RequestPoint", (user, command) -> markerDatabase.addPoint(command));
        CommandDispatcher.registerCommand("RemovePoint", (user, command) -> markerDatabase.removeEntry(command.userIdx));
        CommandDispatcher.registerCommand("RegisterCommand", (user, command) -> {
            CommandDispatcher.sendCommand(command.userIdx, command);
            for (Command point : markerDatabase.getValues()) {
                CommandDispatcher.sendCommand(command.userIdx, point);
            }
            if (chatDataBase.getChats(command.userIdx).size() > 0) {
                Command chats = new Command();
                chats.userIdx = command.userIdx;
                chats.messages = chatDataBase.jsonArray(chatDataBase.getChats(command.userIdx));
                CommandDispatcher.sendCommand(command.userIdx, chats);
            }
        });
        CommandDispatcher.registerCommand("AnswerStream", (user, command) -> {
            System.out.println("NONO");
            if (command.markerIdx != 0) {
                CommandDispatcher.sendCommand(markerDatabase.getKey(command), command);
            } else {
                CommandDispatcher.sendCommand(command.targetIdx, command);
            }
        });
        CommandDispatcher.registerCommand("OfferStream", (user, command) -> {
            CommandDispatcher.broadcast(command);
        });

        markerDatabase.setPointRemovedCallback(command -> CommandDispatcher.broadcastPoint(command, false));
        markerDatabase.setPointAddedCallback(command -> CommandDispatcher.broadcastPoint(command, true));
        webSocket("/chat", WSCallback.class);
        init();
    }
}
