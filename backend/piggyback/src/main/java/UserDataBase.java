import org.eclipse.jetty.websocket.api.Session;

/**
 * Created by Elmar on 10-Mar-18.
 */
public class UserDataBase extends DataBase<String, Session> {
    @Override
    void entryAdded(String key, Session value) {
        System.out.println("[Sys] : User("+key+") connected.");
    }

    @Override
    void entryRemoved(String key, Session value) {
        System.out.println("[Sys] : User("+key+") disconnected.");
    }
}
