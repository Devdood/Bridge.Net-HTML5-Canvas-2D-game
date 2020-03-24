using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestGame2D
{
    public class GameObjectsManager
    {
        private static Dictionary<int, GameObject> objects = new Dictionary<int, GameObject>();
        private static int lastId = 1;

        public static int GetNewId()
        {
            return lastId++;
        }

        public static Dictionary<int, GameObject> GetObjects()
        {
            return objects;
        }

        public static void AddObject(int id, GameObject go)
        {
            if (!objects.ContainsKey(id))
            {
                objects.Add(id, go);
            }
        }

        public static void RemoveObject(int id)
        {
            objects.Remove(id);
        }

        public static void AddObject<T>(T g) where T : GameObject
        {
            int id = GetNewId();
            g.ObjectId = id;
            objects.Add(id, g);
        }
    }
}
