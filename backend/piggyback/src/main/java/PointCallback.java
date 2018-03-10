/**
 * Created by Elmar on 09-Mar-18.
 */
public interface PointCallback {
    void pointAdded(String origin, Command point);
    void pointRemoved(String origin, Command point);
}
