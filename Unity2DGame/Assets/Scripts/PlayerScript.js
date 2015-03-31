﻿#pragma strict

/**
 * 1 - The speed of the ship.
 */
public var speed : Vector2 = Vector2(50, 50);
		
/**
 * 2 - Store the movement.
 */
private var movement : Vector2;
		
function Update() 
{
    // 3 - Retrieve axis information
    var inputX : float = Input.GetAxis("Horizontal");
    var inputY : float = Input.GetAxis("Vertical");

    // 4 - Movement per direction
    movement = new Vector2(
      speed.x * inputX,
      speed.y * inputY);
      
    // 5 - Shooting
    var shoot : boolean = Input.GetButtonDown("Fire1");
    shoot = shoot || Input.GetButtonDown("Fire2");
    
    // Careful: For Mac users, ctrl + arrow is a bad idea
    if (shoot)
    {
		var weapon : WeaponScript = GetComponent(WeaponScript);
		if (weapon != null)
		{
			// false because the player is not an enemy
			weapon.Attack(false);
		}
    }
}

function FixedUpdate() 
{
    // 5 - Move the game object
    GetComponent(Rigidbody2D).velocity = movement;
}

function OnCollisionEnter2D(collision : Collision2D)
{
	var damagePlayer : boolean = false;

	// Collision with enemy
	var enemy : EnemyScript = collision.gameObject.GetComponent.<EnemyScript>();
	
	if (enemy != null)
	{
	  // Kill the enemy
	  var enemyHealth : HealthScript = enemy.GetComponent.<HealthScript>();
	  if (enemyHealth != null) enemyHealth.Damage(enemyHealth.hp);

	  damagePlayer = true;
	}

	// Damage the player
	if (damagePlayer)
	{
	  var playerHealth : HealthScript = this.GetComponent.<HealthScript>();
	  if (playerHealth != null) playerHealth.Damage(1);
	}
}