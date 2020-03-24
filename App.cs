using Bridge;
using Bridge.Html5;
using Newtonsoft.Json;
using System;

namespace TestGame2D
{
    public class App
    {
        public static HTMLCanvasElement Canvas { get; private set; }
        public static CanvasRenderingContext2D Context { get; private set; }    

        public const int WIDTH = 1024;
        public const int HEIGHT = 576;

        public static event Action OnUpdate = delegate { };

        public App()
        {
            App.Canvas = (HTMLCanvasElement)Document.GetElementById("canvas");
            App.Context = (CanvasRenderingContext2D)Canvas.GetContext("2d");

            OnUpdate += App_OnUpdate;
        }

        private void App_OnUpdate()
        {
            Context.FillStyle = "#000";
            Context.FillRect(0, 0, WIDTH, HEIGHT);
        }

        public void Update()
        {
            Window.SetTimeout(() =>
            {
                Update();
                OnUpdate();
            }, 30);
        }

        public void InitCanvas(int width, int height, string color = "#fff")
        {
            Canvas.Width = width;
            Canvas.Height = height;
            Context.FillStyle = color;
            Context.FillRect(0, 0, width, width);

            Update();
        }

        public static void Main()
        {
            var app = new App();
            app.InitCanvas(WIDTH, HEIGHT, color: "#ff8934");

            GameController gameController = new GameController();
            gameController.Init();
        }
    }
}