import { OracleClient } from '../src/OracleClient';
import { ApplicationClient } from '@algorandfoundation/algokit-utils';
import { Algodv2 } from 'algosdk';

// Mock Algod client
const algod = new Algodv2('token', 'http://localhost', 4001);

// Mock ApplicationClient configuration
const appClient = new ApplicationClient({
  app: {
    name: 'OracleApp',
    methods: [
      { name: 'update', args: ['uint64', 'byte[]'] },
      { name: 'get', args: ['uint64'] }
    ]
  },
  algod: algod,
  sender: {
    addr: 'TESTACCOUNT',
    signer: () => Promise.resolve(new Uint8Array())
  }
});

test("Oracle workflow", async () => {
    const oracle = new OracleClient(appClient);
    
    // Test data update
    await oracle.updateData(100, new TextEncoder().encode("price=1.2"));
    
    // Test valid retrieval
    const data = await oracle.getData(100);
    expect(new TextDecoder().decode(data)).toBe("price=1.2");
    
    // Test missing data error
    await expect(oracle.getData(101)).rejects.toThrow();
});