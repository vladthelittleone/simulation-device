#pragma strict
import System.Collections.Generic;
import System.Linq;

/// <summary>
/// Parallax scrolling script that should be assigned to a layer
/// </summary>

/// <summary>
/// Scrolling speed
/// </summary>
public var speed : Vector2 = Vector2(2, 2);

/// <summary>
/// Moving direction
/// </summary>
public var direction : Vector2 = Vector2(-1, 0);

/// <summary>
/// Movement should be applied to camera
/// </summary>
public var isLinkedToCamera : boolean = false;

/// <summary>
/// 1 - Background is infinite
/// </summary>
public var isLooping : boolean = false;

/// <summary>
/// 2 - List of children with a renderer.
/// </summary>
private var backgroundPart : List.<Transform>;


function Update()
{
	// Movement
	var movement : Vector3 = Vector3(
	  speed.x * direction.x,
	  speed.y * direction.y,
	  0);

	movement *= Time.deltaTime;
	transform.Translate(movement);

	// Move the camera
	if (isLinkedToCamera)
	{
	  Camera.main.transform.Translate(movement);
	}
	
	// 4 - Loop
    if (isLooping)
    {
      // Get the first object.
      // The list is ordered from left (x position) to right.
      var firstChild : Transform = backgroundPart.FirstOrDefault();

      if (firstChild != null)
      {
        // Check if the child is already (partly) before the camera.
        // We test the position first because the IsVisibleFrom
        // method is a bit heavier to execute.
        if (firstChild.position.x < Camera.main.transform.position.x)
        {
          // If the child is already on the left of the camera,
          // we test if it's completely outside and needs to be
          // recycled.
          if (RendererHelpers.IsRenderedFrom(firstChild.GetComponent.<Renderer>(), Camera.main) == false)
          {
            // Get the last child position.
            var lastChild : Transform = backgroundPart.LastOrDefault();
            var lastPosition : Vector3 = lastChild.transform.position;
            var lastSize : Vector3 = (lastChild.GetComponent.<Renderer>().bounds.max - lastChild.GetComponent.<Renderer>().bounds.min);

            // Set the position of the recyled one to be AFTER
            // the last child.
            // Note: Only work for horizontal scrolling currently.
            firstChild.position = Vector3(lastPosition.x + lastSize.x, firstChild.position.y, firstChild.position.z);

            // Set the recycled child to the last position
            // of the backgroundPart list.
            backgroundPart.Remove(firstChild);
            backgroundPart.Add(firstChild);
          }
        }
      }
    }
}

// 3 - Get all the children
function Start()
{
	// For infinite background only
	if (isLooping)
	{
	  // Get all the children of the layer with a renderer
	  backgroundPart = List.<Transform>();

	  for (var i : int = 0; i < transform.childCount; i++)
	  {
	    var child : Transform = transform.GetChild(i);

	    // Add only the visible children
	    if (child.GetComponent.<Renderer>() != null)
	    {
	      backgroundPart.Add(child);
	    }
	  }

	  // Sort by position.
	  // Note: Get the children from left to right.
	  // We would need to add a few conditions to handle
	  // all the possible scrolling directions.
	  backgroundPart = backgroundPart.OrderBy(
	    function(t){return t.position.x;}
	  ).ToList();
	}
}