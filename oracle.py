from beaker import *
from pyteal import *

class OracleApp(Application):
    # Creator-only method to update data for a round
    @external(authorize=Authorize.only(Global.creator_address()))
    def update(self, round: abi.Uint64, data: abi.DynamicBytes):
        return Seq(
            App.box_put(Itob(round.get()), data.get())
        )

    # Get data for a round (returns empty if missing)
    @external(read_only=True)
    def get(self, 
            round: abi.Uint64, 
            user_data: abi.DynamicBytes, 
            *, output: abi.DynamicBytes
        ):
        data = App.box_get(Itob(round.get()))
        return Seq(
            data,
            output.set(If(data.hasValue(), data.value(), Bytes("")))
    
    # Get data for a round (panics if missing)
    @external(read_only=True)
    def must_get(self, 
                round: abi.Uint64, 
                user_data: abi.DynamicBytes, 
                *, output: abi.DynamicBytes
            ):
        data = App.box_get(Itob(round.get()))
        return Seq(
            data,
            Assert(data.hasValue()),
            output.set(data.value()))