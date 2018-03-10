/**
 * Created by Elmar on 09-Mar-18.
 */
public interface HandleCommand {
    void ProcRequestPoint(Command point);
    void ProcRequestStream(Command stream);
    void ProcAnswerStream(Command stream);
    void ProcRemovePoint(Command stream);
    void ProcRegister(Command cmd);
}
