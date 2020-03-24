using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestGame2D
{
    public class GameController
    {
        public Camera camera;
        public Map map;
        public Player player;

        //TODO: Migrate logic of player input to controller
        public PlayerController playerController;

        public void Init()
        {
            playerController = new PlayerController();

            App.Canvas.AddEventListener("click", e => GetMousePosition(App.Canvas, e));
            
            map = GameObject.Instantiate<Map>(500, 1000, 1000, 1000, "https://i.stack.imgur.com/NaUX7.png");
            
            GameObject.Instantiate<Character>(730, 400, 32, 32, "img/player1.png");
            player = GameObject.Instantiate<Player>(670, 400, 32, 32, "img/player1.png");
            camera = GameObject.Instantiate<Camera>(250, 250, 32, 32, "");
            camera.SetTarget(player);
            App.OnUpdate += Update;
        }

        public void Update()
        {
            foreach (var item in GameObjectsManager.GetObjects())
            {
                item.Value.Update();
                item.Value.Draw(App.Context, camera.PosX - camera.camOffsetX, camera.PosY - camera.camOffsetY);
            }
        }

        public void GetMousePosition(HTMLCanvasElement c, Event e)
        {
            var rect = (ClientRect)c.GetBoundingClientRect();
            var mouse = (MouseEvent)e;
            var px = (int)(mouse.ClientX - rect.Left);
            var py = (int)(mouse.ClientY - rect.Top);

            var destX = player.PosX + px - camera.camOffsetX;
            var destY = player.PosY + py - camera.camOffsetY;

            if (destX < map.width - player.width && destY < map.height - player.height && 
                destX > 0 + player.width && destY > 0 + player.height)
            {
                player.SetDestination(destX, destY);
            }
        }
    }
}
