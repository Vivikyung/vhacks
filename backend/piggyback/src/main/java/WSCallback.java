import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

/**
 * Created by Elmar on 09-Mar-18.
 */

@WebSocket
public class WSCallback {
    @OnWebSocketConnect
    public void onConnect(Session user) throws Exception {
        System.out.println("Connected user");
    }

    @OnWebSocketClose
    public void onClose(Session user, int statusCode, String reason) {
        CommandDispatcher.userClosed(user);
        // Empty for now
    }

    @OnWebSocketMessage
    public void onMessage(Session user, String message) {
        CommandDispatcher.processCommand(message, user);
    }


}