from .hos import generate_hos
from rest_framework.views import APIView
from rest_framework.response import Response

from .routing import calculate_route


class GenerateRouteView(APIView):

    def post(self, request):

        try:

            route = calculate_route(
                request.data["current_location"],
                request.data["pickup_location"],
                request.data["dropoff_location"],
            )
    
            hos = generate_hos(
	        route["distance_miles"],
                float(request.data["cycle_used_hours"]),
            )
    
            return Response({
	        "route": route,
                "hos": hos,
            })
        
        except Exception as e:
    
            return Response(
                {"error": str(e)},
                status=400,
            )
