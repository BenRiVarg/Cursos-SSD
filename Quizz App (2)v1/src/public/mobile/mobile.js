

        var allowDragWithTwoFingersOnly = function (event) {

            // only allow drag with two fingers
            return (event.touches.length === 2);
        };

        var threshold = 10;
        var startX, startY;

        var allowHorizontalDragOnly = function (event) {

            var touch = event.touches[0];

            if (startX === undefined || startY === undefined) {
                startX = touch.clientX;
                startY = touch.clientY;

                // we are uncertain if we shall start a drag operation.. return undefined
                return;
            }

            var deltaX = Math.abs(startX - touch.clientX),
                deltaY = Math.abs(startY - touch.clientY);

            console.log("startX: " + startX);
            console.log("startY: " + startY);

            console.log("deltaX: " + deltaX);
            console.log("deltaY: " + deltaY);

            if (deltaX > threshold || deltaY > threshold) {

                console.log("threshold reached.");

                // reset our initial values
                startX = undefined;
                startY = undefined;

                if (deltaX > deltaY) {

                    console.log('horizontal drag detected, starting drag');
                    // we know for sure to start it, return true
                    return true;
                }
                else {

                    console.log('vertical scroll detected, aborting drag');
                    // we know for sure to abort it, return false
                    return false;
                }
            }
        };

        var alertAction = function (event) {

            event.stopImmediatePropagation();
            event.preventDefault();
            alert("I'm your default action override");
            return true;
        };
        
        var urlParams = new URLSearchParams(window.location.search);
        var holdToDrag = urlParams.get('holdToDrag');

        var polyfillApplied = MobileDragDrop.polyfill({

            dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride,
            holdToDrag: holdToDrag
        });
        
        
         try {
            window.addEventListener('touchmove', function () {
            }, {passive: false})
        } catch(e) {}
