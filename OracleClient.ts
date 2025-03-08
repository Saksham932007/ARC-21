import { ApplicationClient } from '@algorandfoundation/algokit-utils';
import { Buffer } from 'buffer';
import { OracleClient as ExternalOracleClient } from '@/OracleClient';  // Resolves to ./src/OracleClient.ts

export class OracleClient {
    // Store appClient with proper type
    constructor(private appClient: ApplicationClient) {}

    /**
     * Update oracle data for a specific round
     * @param round - Block round number (64-bit unsigned integer)
     * @param data - Binary data to store for the round
     */
    async updateData(round: number, data: Uint8Array): Promise<void> {
        await this.appClient.call({
            method: 'update',
            methodArgs: [
                round, 
                data
            ],
            boxes: [
                // Convert round to 8-byte big-endian format
                new Uint8Array(Buffer.from(round.toString(10).padStart(8, '0'))),
            ],
        });
    }

    /**
     * Retrieve oracle data for a specific round
     * @param round - Block round number to query
     * @returns Binary data stored for the round
     */
    async getData(round: number): Promise<Uint8Array> {
        const response = await this.appClient.call({
            method: 'get',
            methodArgs: [
                round,
                new Uint8Array(0) // Empty user_data as per ARC-21 spec
            ],
            boxes: [
                new Uint8Array(Buffer.from(round.toString(10).padStart(8, '0')))
            ],
        });
        
        return response.returnValue as Uint8Array;
    }
}