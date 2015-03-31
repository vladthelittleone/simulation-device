#pragma strict

/// <summary>
/// Projectile behavior
/// </summary>

// 1 - Designer variables

/// Damage inflicted
public var damage : int = 1;

/// Projectile damage player or enemies?
public var isEnemyShot : boolean = false;

function Start()
{
	// 2 - Limited time to live to avoid any leak
	Destroy(gameObject, 20); // 20sec
}
