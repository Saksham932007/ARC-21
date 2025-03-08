from algokit_utils import ApplicationClient
from algosdk.abi import Method
from algosdk.v2client.algod import AlgodClient
from beaker import Application

class OracleClient:
    """ARC-21 Oracle Client for Python"""
    
    def __init__(self, app_client: ApplicationClient):
        self.app_client = app_client

    def update_data(self, round: int, data: bytes) -> None:
        """Update oracle data for a specific round"""
        self.app_client.call(
            method=Method(name="update", args=[round, data]),
            boxes=[(self.app_client.app_id, round.to_bytes(8, "big"))],
        )

    def get_data(self, round: int) -> bytes:
        """Retrieve oracle data for a specific round"""
        response = self.app_client.call(
            method=Method(name="get", args=[round, b""]),
            boxes=[(self.app_client.app_id, round.to_bytes(8, "big"))],
        )
        return response.return_value