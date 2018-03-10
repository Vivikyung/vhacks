import org.eclipse.jetty.websocket.api.Session;

/**
 * Created by Elmar on 10-Mar-18.
 */
public interface WebsocketCallback {
    void callback(Session user, Command command);
}
