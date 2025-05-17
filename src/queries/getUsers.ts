// src/queries/user/getUser.ts
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

export const getUser = async (publicKey: any) => {
    const data = { publicKey };
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/info`, data, {
        headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
            // 'Authorization': 'Bearer your-token'
        }
    });
    if (res.data) return res.data;
    return null
};