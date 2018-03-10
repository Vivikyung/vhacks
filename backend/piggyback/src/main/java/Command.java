/**
 * Created by Elmar on 09-Mar-18.
 */
public class Command {
    public String userIdx;
    public String targetIdx;
    public String command;
    public String latitude;
    public String longitude;
    public int markerIdx;
    public String data;
    public String messages[];

    public String toString(){
        return "[user: " + userIdx + " target: " + targetIdx + " marker: " + markerIdx +  " command: " + command + "]";
    }
}
