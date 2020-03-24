using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace TestGame2D
{
    public class Player : Character
    {
        public override void Draw(CanvasRenderingContext2D ctx, int offsetX, int offsetY)
        {
            ctx.DrawImage(imageElement, (App.WIDTH / 2) - this.offsetX, (App.HEIGHT / 2) - this.offsetY, width, height);
        }
    }
}
