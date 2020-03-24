using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestGame2D
{
    public class Character : GameObject
    {
        public int DestinationX;
        public int DestinationY;

        public int Speed = 3;

        public bool rotated = false;

        public void SetDestination(int x, int y)
        {
            DestinationX = x;
            DestinationY = y;
        }

        public override void Init()
        {
            base.Init();
            DestinationX = PosX;
            DestinationY = PosY;
        }

        public override void Update()
        {
            base.Update();
            UpdateDestination();
        }

        private void UpdateDestination()
        {
            int speed = this.Speed;
            if (PosX != DestinationX)
            {
                if (Math.Abs(DestinationX - PosX) < speed)
                {
                    PosX += DestinationX > PosX ? 1 : -1;
                }
                else
                {
                    PosX += DestinationX > PosX ? Speed : -Speed;
                }

                if(rotated && DestinationX < PosX)
                {
                    rotated = false;
                    imageElement.Width = 1;
                }
                else if(!rotated && DestinationX > PosX)
                {
                    rotated = true;
                    imageElement.Width = Math.Abs(imageElement.Width) * -1;
                }
            }

            if (PosY != DestinationY)
            {
                if (Math.Abs(DestinationY - PosY) < speed)
                {
                    PosY += DestinationY > PosY ? 1 : -1;
                }
                else
                {
                    PosY += DestinationY > PosY ? Speed : -Speed;
                }
            }
        }
    }
}
