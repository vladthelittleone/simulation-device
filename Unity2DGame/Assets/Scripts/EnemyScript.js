#pragma strict

/// <summary>
/// Enemy generic behavior
/// </summary>

private var weapons : WeaponScript[];

function Awake()
{
	// Retrieve the weapon only once
    weapons = GetComponentsInChildren.<WeaponScript>();
}

function Update()
{
	for (var weapon : WeaponScript in weapons)
    {
		// Auto-fire
		if (weapon != null && weapon.CanAttack())
		{
			weapon.Attack(true);
		}
    }
}