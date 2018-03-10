import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by Elmar on 09-Mar-18.
 */
public abstract class DataBase<K,V> {
    protected HashMap<K, V> keyToValue = new HashMap<>();
    protected HashMap<V, K> valueToKey = new HashMap<>();

    abstract void entryAdded(K key, V value);
    abstract void entryRemoved(K key, V value);

    public boolean containsKey(K key){
        return keyToValue.containsKey(key);
    }

    public boolean containsValue(V value){
        return valueToKey.containsKey(value);
    }

    public K getKey(V value){
        return valueToKey.get(value);
    }

    public V getValue(K key){
        return keyToValue.get(key);
    }

    protected void addEntry(K key, V value){
        keyToValue.put(key, value);
        valueToKey.put(value, key);
        entryAdded(key, value);
    }

    protected boolean removeValue(V value){
        if(!valueToKey.containsKey(value)){
            return false;
        }
        if(!keyToValue.containsKey(valueToKey.get(value))){
            return false;
        }
        K key = valueToKey.get(value);
        keyToValue.remove(key);
        valueToKey.remove(value);
        entryRemoved(key, value);
        return true;
    }

    protected boolean removeEntry(K key){
        if(!keyToValue.containsKey(key)){
            return false;
        }
        if(!valueToKey.containsKey(keyToValue.get(key))){
            return false;
        }
        V value = keyToValue.get(key);
        keyToValue.remove(key);
        valueToKey.remove(value);
        entryRemoved(key, value);
        return true;
    }

    public ArrayList<K> getKeys(){
        return new ArrayList<K>(valueToKey.values());
    }
    public ArrayList<V> getValues(){
        return new ArrayList<V>(keyToValue.values());
    }

}
