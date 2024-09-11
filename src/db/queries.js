const Create_Contact = "CREATE TABLE if not exists Contact (" +
    "_ID" + " integer PRIMARY KEY autoincrement," +//0
    "JEWELCHAT_ID" + "  INTEGER , " +//1
    "JID" + " TEXT ," + //2
    "CONTACT_NUMBER" + "  INTEGER , " +//3
    "CONTACT_NAME" + "  TEXT , " +//4
    "PHONEBOOK_CONTACT_NAME" + "  TEXT , " +//5
    "IS_GROUP" + "  INTEGER DEFAULT 0  , " +//6
    "STATUS_MSG" + "  TEXT , " +//7
    "IS_REGIS" + "  INTEGER DEFAULT 0 , " +//8
    "IS_GROUP_ADMIN" + "  INTEGER , " +//9
    "IS_INVITED" + "  INTEGER DEFAULT 0 , " +//10
    "IS_BLOCKED" + "  INTEGER DEFAULT 0 , " +//11
    "IS_PHONEBOOK_CONTACT" + "  INTEGER , " +//12					
    "UNREAD_COUNT" + "  INTEGER DEFAULT 0  , " +//13
    "LAST_MSG_CREATED_TIME  INTEGER, " +
    "MSG_TYPE   INTEGER , " +
    "MSG_TEXT   TEXT , " +
    "SMALL_IMAGE" + " TEXT , " +
    "IMAGE_PATH" + "  TEXT , " + 
    "unique ( " + "JID" + " ), unique ( " + "CONTACT_NUMBER" + " ) )";


const Create_ChatMessage = "CREATE TABLE if not exists ChatMessage (" +
    "_ID  integer PRIMARY KEY autoincrement ," +
    "IS_GROUP_MSG   INTEGER DEFAULT 0 ," +
    "MSG_TYPE   INTEGER ," +
    "CREATED_DATE  TEXT ," +
    "CREATED_TIME  INTEGER ," +
    "CHAT_ROOM_JID	  TEXT ," +
    "CREATOR_JID	  TEXT ," +    
    "SENDER_NAME  TEXT ," +
    "SENDER_MSG_ID   TEXT DEFAULT NULL," +
    "IS_READ	 INTEGER DEFAULT 0 ," +
    "TIME_READ   INTEGER ," +
    "IS_DELIVERED   INTEGER DEFAULT 0 ," +
    "TIME_DELIVERED  INTEGER ," +
    "IS_SUBMITTED   INTEGER DEFAULT 0 ," +
    "TIME_SUBMITTED  INTEGER ," +
    "TIME_CREATED INTEGER" +
    "IS_ERROR  INTEGER DEFAULT 0 ," +
    "JEWEL_TYPE   INTEGER ," +
    "IS_JEWEL_PICKED  INTEGER DEFAULT 0 ," +
    "MSG_TEXT   TEXT ," +    
    "MEDIA_UPLOADED  INTEGER DEFAULT 0 ," +    
    "MEDIA_CLOUD  TEXT DEFAULT NULL," +
    "MEDIA_CLOUD_THUMBNAIL  TEXT DEFAULT NULL," +
    "SEQUENCE  INTEGER DEFAULT 0," +
    "IS_REPLY INTEGER DEFAULT 0," +
    "REPLY_PARENT INTEGER DEFAULT NULL," +
    "IS_FORWARD INTEGER DEFAULT 0," +
    "UNIQUE(" + "SENDER_MSG_ID, " + "CHAT_ROOM_JID, " + "CREATOR_JID "+ "))"

const Create_GroupMembers = "CREATE TABLE if not exists GroupMembers (" +
    "_ID  integer PRIMARY KEY autoincrement ," +
    "GROUP_JID   TEXT ," +    
    "MEMBER_JID	  TEXT ," +
    "AFFILIATION  TEXT ," +    
    "UNIQUE(" + "GROUP_JID" + "," + "MEMBER_JID" + "))"    

const Sequence_Trigger = "CREATE TRIGGER IF NOT EXISTS Update_Sequence " +
    " AFTER INSERT ON ChatMessage WHEN NEW.SENDER_MSG_ID IS NOT NULL" +
    " BEGIN" +
    " UPDATE ChatMessage " +
    " SET SEQUENCE = (SELECT MAX(SEQUENCE) FROM ChatMessage) + 1 " +
    " WHERE _ID = NEW._ID;" +
    "END"
export default {
    Create_Contact,
    Create_ChatMessage,
    Create_GroupMembers,
    Sequence_Trigger
};

// reply parent & crreator jid
// 
