import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.jetty.websocket.api.Session;

import java.io.IOException;
import java.util.HashMap;

/**
 * Created by Elmar on 10-Mar-18.
 */
public class CommandDispatcher {
    private static HashMap<String, WebsocketCallback> commandToCallback = new HashMap<>();
    private static UserDataBase userDataBase = new UserDataBase();

    public static void registerCommand(String command, WebsocketCallback callback) {
        System.out.println("[SYS] Registered: " + command);
        commandToCallback.put(command, callback);
    }

    public static void processCommand(String message, Session session) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            Command cmd = mapper.readValue(message, Command.class);
            if (cmd.command.equals("RegisterCommand")) {
                if (userDataBase.containsKey(cmd.userIdx)) {
                    System.out.println("Already in use");
                } else {
                    userDataBase.addEntry(cmd.userIdx, session);
                    if (commandToCallback.containsKey("RegisterCommand")) {
                        commandToCallback.get("RegisterCommand").callback(session, cmd);
                    }
                }
            } else if (commandToCallback.containsKey(cmd.command)) {
                System.out.println("[DEB] Proc: " + cmd.command + " | " + cmd);
                commandToCallback.get(cmd.command).callback(session, cmd);
            } else {
                System.out.println("Not implemented");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendCommand(String targetIdx, Command command) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            System.out.println(targetIdx);
            String requestAsString = objectMapper.writeValueAsString(command);
            userDataBase.getValue(targetIdx).getRemote().sendString(requestAsString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void broadcastPoint(Command newPoint, boolean add) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (add) {
                newPoint.command = "RequestPoint";
            } else {
                newPoint.command = "RemovePoint";
            }
            String pointAsString = objectMapper.writeValueAsString(newPoint);
            userDataBase.getValues().stream().forEach(session -> {
                try {
                    session.getRemote().sendString(pointAsString);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public static void broadcast(Command command) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String pointAsString = objectMapper.writeValueAsString(command);
            userDataBase.getValues().stream().forEach(session -> {
                try {
                    session.getRemote().sendString(pointAsString);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }


    public static void userClosed(Session user) {
        userDataBase.removeValue(user);
    }
}
