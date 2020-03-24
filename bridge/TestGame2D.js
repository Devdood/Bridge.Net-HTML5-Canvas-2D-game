/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("TestGame2D", function ($asm, globals) {
    "use strict";

    Bridge.define("TestGame2D.App", {
        main: function Main () {
            System.Console.WriteLine("Welcome to Bridge.NET");

            var app = new TestGame2D.App();
            app.InitCanvas(500, 500, "#ff8934");
        },
        statics: {
            fields: {
                WIDTH: 0,
                HEIGHT: 0,
                canvas: null,
                ctx: null
            },
            ctors: {
                init: function () {
                    this.WIDTH = 768;
                    this.HEIGHT = 504;
                }
            }
        },
        fields: {
            player: null
        },
        events: {
            OnUpdate: null
        },
        ctors: {
            init: function () {
                Bridge.event(this, "OnUpdate", function () { });
            },
            ctor: function () {
                this.$initialize();
                TestGame2D.App.canvas = Bridge.cast(document.getElementById("canvas"), HTMLCanvasElement);
                TestGame2D.App.ctx = TestGame2D.App.canvas.getContext("2d");

                this.player = new TestGame2D.Player();

                this.addOnUpdate(Bridge.fn.cacheBind(this, this.App_OnUpdate));
            }
        },
        methods: {
            App_OnUpdate: function () {
                this.player.Update();
                TestGame2D.App.ctx.fillStyle = "#fff";
                TestGame2D.App.ctx.fillRect(0, 0, TestGame2D.App.WIDTH, TestGame2D.App.HEIGHT);
                TestGame2D.App.ctx.fillStyle = "#000";

                this.player.Draw(TestGame2D.App.ctx);
            },
            Update: function () {
                window.setTimeout(Bridge.fn.bind(this, function () {
                    this.Update();
                    this.OnUpdate();
                }), 30);
            },
            InitCanvas: function (width, height, color) {
                if (color === void 0) { color = "#fff"; }
                TestGame2D.App.canvas.width = width;
                TestGame2D.App.canvas.height = height;
                TestGame2D.App.ctx.fillStyle = color;
                TestGame2D.App.ctx.fillRect(0, 0, width, width);
                TestGame2D.App.canvas.addEventListener("click", Bridge.fn.bind(this, function (e) {
                    this.GetMousePosition(TestGame2D.App.canvas, e);
                }));

                this.Update();
            },
            GetMousePosition: function (c, e) {
                var rect = c.getBoundingClientRect();
                var mouse = Bridge.cast(e, MouseEvent);
                var px = Bridge.Int.clip32(mouse.clientX - rect.left);
                var py = Bridge.Int.clip32(mouse.clientY - rect.top);

                this.player.SetDestination(px, py);
            }
        }
    });

    Bridge.define("TestGame2D.GameObject", {
        fields: {
            PosX: 0,
            PosY: 0,
            imageElement: null
        },
        methods: {
            Init: function () {
                this.imageElement = new Image();
                this.imageElement.onload = Bridge.fn.bind(this, function (ev) {
                    System.Console.WriteLine("Image size: " + this.imageElement.width + " x " + this.imageElement.height);
                });
                this.imageElement.src = "https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg";

            },
            Update: function () { },
            Draw: function (ctx) {
                ctx.drawImage(this.imageElement, this.PosX, this.PosY);
            }
        }
    });

    Bridge.define("TestGame2D.Character", {
        inherits: [TestGame2D.GameObject],
        fields: {
            DestinationX: 0,
            DestinationY: 0,
            Speed: 0
        },
        ctors: {
            init: function () {
                this.Speed = 3;
            }
        },
        methods: {
            SetDestination: function (x, y) {
                this.DestinationX = x;
                this.DestinationY = y;
            },
            Update: function () {
                if (this.PosX !== this.DestinationX) {
                    this.PosX = (this.PosX + (this.DestinationX > this.PosX ? 1 : -1)) | 0;
                }

                if (this.PosY !== this.DestinationY) {
                    this.PosY = (this.PosY + (this.DestinationY > this.PosY ? 1 : -1)) | 0;
                }
            }
        }
    });

    Bridge.define("TestGame2D.Player", {
        inherits: [TestGame2D.Character]
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUZXN0R2FtZTJELmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJHYW1lT2JqZWN0LmNzIiwiQ2hhcmFjdGVyLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBdUVZQTs7WUFFQUEsVUFBVUEsSUFBSUE7WUFDZEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0F6RDJCQTs7OztnQkFJM0JBLHdCQUFhQSxZQUFtQkE7Z0JBQ2hDQSxxQkFBVUEsQUFBMEJBOztnQkFFcENBLGNBQVNBLElBQUlBOztnQkFFYkEsaUJBQVlBOzs7OztnQkFLWkE7Z0JBQ0FBO2dCQUNBQSxrQ0FBbUJBLHNCQUFPQTtnQkFDMUJBOztnQkFFQUEsaUJBQVlBOzs7Z0JBS1pBLGtCQUFrQkEsQUFBU0E7b0JBRXZCQTtvQkFDQUE7OztrQ0FJZUEsT0FBV0EsUUFBWUE7O2dCQUUxQ0EsOEJBQWVBO2dCQUNmQSwrQkFBZ0JBO2dCQUNoQkEsK0JBQWdCQTtnQkFDaEJBLGtDQUFtQkEsT0FBT0E7Z0JBQzFCQSxnREFBaUNBLEFBQWdCQTtvQkFBS0Esc0JBQWlCQSx1QkFBUUE7OztnQkFFL0VBOzt3Q0FHeUJBLEdBQXFCQTtnQkFFOUNBLFdBQVdBLEFBQVlBO2dCQUN2QkEsWUFBWUEsWUFBWUE7Z0JBQ3hCQSxTQUFTQSxrQkFBS0EsQUFBQ0EsZ0JBQWdCQTtnQkFDL0JBLFNBQVNBLGtCQUFLQSxBQUFDQSxnQkFBZ0JBOztnQkFFL0JBLDJCQUFzQkEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Z0JDakQxQkEsb0JBQWVBO2dCQUNmQSwyQkFBc0JBLCtCQUFDQTtvQkFFbkJBLHlCQUFrQkEsaUJBQWlCQSxrQ0FBNkJBOztnQkFFcEVBOzs7OzRCQVFxQkE7Z0JBR3JCQSxjQUFjQSxtQkFBY0EsV0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0NsQlhBLEdBQU9BO2dCQUU5QkEsb0JBQWVBO2dCQUNmQSxvQkFBZUE7OztnQkFLZkEsSUFBSUEsY0FBUUE7b0JBRVJBLHlCQUFRQSxxQkFBZUEsZ0JBQVdBOzs7Z0JBR3RDQSxJQUFJQSxjQUFRQTtvQkFFUkEseUJBQVFBLHFCQUFlQSxnQkFBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFRlc3RHYW1lMkRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBIVE1MQ2FudmFzRWxlbWVudCBjYW52YXM7XHJcbiAgICAgICAgc3RhdGljIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBjdHg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgV0lEVEggPSA3Njg7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBIRUlHSFQgPSA1MDQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBQbGF5ZXIgcGxheWVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZXZlbnQgQWN0aW9uIE9uVXBkYXRlID0gZGVsZWdhdGUgeyB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFwcC5jYW52YXMgPSAoSFRNTENhbnZhc0VsZW1lbnQpRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIEFwcC5jdHggPSAoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKWNhbnZhcy5HZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICBPblVwZGF0ZSArPSBBcHBfT25VcGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQXBwX09uVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBsYXllci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgY3R4LkZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xyXG4gICAgICAgICAgICBjdHguRmlsbFJlY3QoMCwgMCwgV0lEVEgsIEhFSUdIVCk7XHJcbiAgICAgICAgICAgIGN0eC5GaWxsU3R5bGUgPSBcIiMwMDBcIjtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5EcmF3KGN0eCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2luZG93LlNldFRpbWVvdXQoKEFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBPblVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KSwgMzApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5pdENhbnZhcyhpbnQgd2lkdGgsIGludCBoZWlnaHQsIHN0cmluZyBjb2xvciA9IFwiI2ZmZlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FudmFzLldpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIGNhbnZhcy5IZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5GaWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY3R4LkZpbGxSZWN0KDAsIDAsIHdpZHRoLCB3aWR0aCk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5BZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKEFjdGlvbjxFdmVudD4pKGUgPT4gR2V0TW91c2VQb3NpdGlvbihjYW52YXMsIGUpKSk7XHJcblxyXG4gICAgICAgICAgICBVcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdldE1vdXNlUG9zaXRpb24oSFRNTENhbnZhc0VsZW1lbnQgYywgRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gKENsaWVudFJlY3QpYy5HZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdmFyIG1vdXNlID0gKE1vdXNlRXZlbnQpZTtcclxuICAgICAgICAgICAgdmFyIHB4ID0gKGludCkobW91c2UuQ2xpZW50WCAtIHJlY3QuTGVmdCk7XHJcbiAgICAgICAgICAgIHZhciBweSA9IChpbnQpKG1vdXNlLkNsaWVudFkgLSByZWN0LlRvcCk7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIuU2V0RGVzdGluYXRpb24ocHgsIHB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiV2VsY29tZSB0byBCcmlkZ2UuTkVUXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFwcCA9IG5ldyBBcHAoKTtcclxuICAgICAgICAgICAgYXBwLkluaXRDYW52YXMoNTAwLCA1MDAsIGNvbG9yOiBcIiNmZjg5MzRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcblxyXG5uYW1lc3BhY2UgVGVzdEdhbWUyRFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgUG9zWDtcclxuICAgICAgICBwdWJsaWMgaW50IFBvc1k7XHJcbiAgICAgICAgcHVibGljIEhUTUxJbWFnZUVsZW1lbnQgaW1hZ2VFbGVtZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtZW50ID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtZW50Lk9uTG9hZCA9IChldikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJJbWFnZSBzaXplOiBcIiArIGltYWdlRWxlbWVudC5XaWR0aCArIFwiIHggXCIgKyBpbWFnZUVsZW1lbnQuSGVpZ2h0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaW1hZ2VFbGVtZW50LlNyYyA9IFwiaHR0cHM6Ly9pbnRlcmFjdGl2ZS1leGFtcGxlcy5tZG4ubW96aWxsYS5uZXQvbWVkaWEvZXhhbXBsZXMvZ3JhcGVmcnVpdC1zbGljZS0zMzItMzMyLmpwZ1wiO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIERyYXcoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGN0eClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY3R4LkZpbGxSZWN0KFBvc1gsIFBvc1ksIDMyLCAzMik7XHJcbiAgICAgICAgICAgIGN0eC5EcmF3SW1hZ2UoaW1hZ2VFbGVtZW50LCBQb3NYLCBQb3NZKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFRlc3RHYW1lMkRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENoYXJhY3RlciA6IEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IERlc3RpbmF0aW9uWDtcclxuICAgICAgICBwdWJsaWMgaW50IERlc3RpbmF0aW9uWTtcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IFNwZWVkID0gMztcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0RGVzdGluYXRpb24oaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGVzdGluYXRpb25YID0geDtcclxuICAgICAgICAgICAgRGVzdGluYXRpb25ZID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoUG9zWCAhPSBEZXN0aW5hdGlvblgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFBvc1ggKz0gRGVzdGluYXRpb25YID4gUG9zWCA/IDEgOiAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFBvc1kgIT0gRGVzdGluYXRpb25ZKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQb3NZICs9IERlc3RpbmF0aW9uWSA+IFBvc1kgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
