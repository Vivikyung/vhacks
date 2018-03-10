import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by Elmar on 09-Mar-18.
 */
public class ChatDataBase extends DataBase<String, HashMap<String, ArrayList<String>>> {
    @Override
    void entryAdded(String key, HashMap<String, ArrayList<String>> value) {

    }

    @Override
    void entryRemoved(String key, HashMap<String, ArrayList<String>> value) {

    }

    public void receiveChatCommand(Command command) {
        HashMap<String, ArrayList<String>> receiver;
        if (!containsKey(command.targetIdx)) {
            receiver = new HashMap<>();
            addEntry(command.targetIdx, receiver);
        } else {
            receiver = getValue(command.targetIdx);
        }
        if (!receiver.containsKey(command.userIdx)) {
            receiver.put(command.userIdx, new ArrayList<>());
        }
        receiver.get(command.userIdx).add(new String(command.data));
    }

    public ArrayList<String> getMessages(String user, String otherUser) {
        if (!containsKey(user)) {
            System.out.println("[WAR] No user with chats");
            return new ArrayList<String>();
        }
        if (getValue(user).containsKey(otherUser)) {
            System.out.println("[WAR] No chat session");
            return new ArrayList<String>();
        }
        return getValue(user).get(otherUser);
    }

    public ArrayList<String> getChats(String user) {
        if (!containsKey(user)) {
            System.out.println("[WAR] No user with chats");
            return new ArrayList<String>();
        }
        System.out.println("Keyset: " + getValue(user).keySet());
        return new ArrayList<String>(getValue(user).keySet());
    }

    public String[] jsonArray(ArrayList<String> string) {
        String returnal[] = new String[string.size()];
        for(int i = 0; i<string.size(); i++){
            returnal[i] = string.get(i);
        }
        return returnal;
    }
}
