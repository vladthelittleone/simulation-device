#pragma strict

/// <summary>
/// 1 - The speed of the object.
/// </summary>
public var speed : Vector2 = Vector2(50, 50);
	
/// <summary>
/// 2 - Moving direction.
/// </summary>
public var direction : Vector2 = Vector2(-1, 0);
	
 /// <summary>
 /// 3 - Store the movement.
 /// </summary>
private var movement : Vector2;
	
function Update() 
{
	/// <summary>
    // 4 - Movement
	/// </summary>
    movement = new Vector2(
      speed.x * direction.x,
      speed.y * direction.y);
}

function FixedUpdate() 
{
	/// <summary>
    // 5 - Apply movement to the rigidbody
	/// </summary>
    GetComponent.<Rigidbody2D>().velocity = movement;
}