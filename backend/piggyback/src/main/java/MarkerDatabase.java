/**
 * Created by Elmar on 09-Mar-18.
 */
public class MarkerDatabase extends DataBase<String, Command> {
    private static int pointIdx = 1;
    CommandCallback pointRemovedCallback = null;
    CommandCallback pointAddedCallback = null;

    public void setPointRemovedCallback(CommandCallback pointRemovedCallback) {
        this.pointRemovedCallback = pointRemovedCallback;
    }

    public void setPointAddedCallback(CommandCallback pointAddedCallback) {
        this.pointAddedCallback = pointAddedCallback;
    }

    private Command createPoint(Command point) {
        Command newPoint = new Command();
        newPoint.markerIdx = MarkerDatabase.pointIdx;
        newPoint.latitude = point.latitude;
        newPoint.longitude = point.longitude;
        newPoint.userIdx = point.userIdx;
        return newPoint;
    }

    public void addPoint(Command point){
        if(containsKey(point.userIdx)){
            Command existingPoint = getValue(point.userIdx);
            removeEntry(point.userIdx);
        }
        Command newPoint = createPoint(point);
        System.out.println("New point created");
        addEntry(newPoint.userIdx,newPoint);
    }

    @Override
    void entryAdded(String key, Command value) {
        pointIdx++;
        pointAddedCallback.callback(value);
        System.out.println("["+key+"]["+value+"]");
    }

    @Override
    void entryRemoved(String key, Command value) {
        pointRemovedCallback.callback(value);
    }
}
