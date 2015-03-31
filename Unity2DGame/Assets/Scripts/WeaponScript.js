#pragma strict

/// <summary>
/// Launch projectile
/// </summary>

//--------------------------------
// 1 - Designer variables
//--------------------------------

/// <summary>
/// Projectile prefab for shooting
/// </summary>
public var shotPrefab : Transform;

/// <summary>
/// Cooldown in seconds between two shots
/// </summary>
public var shootingRate : float = 0.25f;

//--------------------------------
// 2 - Cooldown
//--------------------------------
private var shootCooldown : float;

function Start()
{
	shootCooldown = 0f;
}

function Update()
{
	if (shootCooldown > 0)
	{
		shootCooldown -= Time.deltaTime;
	}
}

//--------------------------------
// 3 - Shooting from another script
//--------------------------------

/// <summary>
/// Create a new projectile if possible
/// </summary>
function Attack(isEnemy : boolean)
{
	if (CanAttack())
	{
		shootCooldown = shootingRate;

		// Create a new shot
		var shotTransform : Transform = Instantiate(shotPrefab);

		// Assign position
		shotTransform.position = transform.position;

		// The is enemy property
		var shot : ShotScript = shotTransform.gameObject.GetComponent(ShotScript);
		
		if (shot != null)
		{
			shot.isEnemyShot = isEnemy;
		}

		// Make the weapon shot always towards it
		var move : MoveScript = shotTransform.gameObject.GetComponent(MoveScript);
		
		if (move != null)
		{
			move.direction = this.transform.right; // towards in 2D space is the right of the sprite
		}
	}
}

/// <summary>
/// Is the weapon ready to create a new projectile?
/// </summary>
function CanAttack()
{
  return shootCooldown <= 0f;
}