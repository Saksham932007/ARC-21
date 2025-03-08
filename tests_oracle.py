def test_oracle_flow():
    # Deploy contract
    client = OracleApp(algod_client)
    oracle_client = OracleClient(client)

    # Update data
    oracle_client.update_data(round=100, data=b"price=1.2")

    # Test get
    assert oracle_client.get_data(100) == b"price=1.2"
    assert oracle_client.get_data(101) == b""

    # Test must_get (expect panic)
    with pytest.raises(Exception):
        oracle_client.must_get_data(101)