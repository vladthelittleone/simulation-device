#pragma strict

static function IsRenderedFrom(renderer : Renderer, camera : Camera) : boolean
{
    var planes = GeometryUtility.CalculateFrustumPlanes(camera);
	return GeometryUtility.TestPlanesAABB(planes, renderer.bounds);
}