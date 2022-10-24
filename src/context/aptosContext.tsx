import React, { ReactNode, useEffect, useState, createContext } from 'react';

import { Types, AptosClient } from 'aptos';

// const protocol_address = '0xb6b036eb0c96620b95c3fba556a1bc6ed33bbe17ff808dfeeea8a9224faf61fd';
const protocol_address = '0xb76373948ab4e8b85a913c7edf94fd1995f9f6547d74127aa64f5bb0ed73c365';
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
const token1 = `${protocol_address}::arc::Pool<0x1::aptos_coin::AptosCoin>`;
const token2 = `${protocol_address}::arc::Pool<${protocol_address}::arc_coin::ARC_Coin>`;
const ticket = `${protocol_address}::arc::Ticket`;
const balance = `0x1::coin::CoinStore<${protocol_address}::arc_coin::ARC_Coin>`;

interface AppContextInterface {
  total_deposit1: string;
  total_deposit2: string;
  value1: string;
  total_borrow1: string;
  total_borrow2: string;
  value2: string;
  borrow_amount: string;
  lend_amount: string;
  last_interact_time: string;
  Deposit1: any;
  Deposit2: any;
  Borrow1: any;
  Borrow2: any;
  Claim: any;
  handleConnect: any;
  handleDisconnect: any;
  address: string | null;
  isConnected: boolean;
  aptPrice: string;
  arcPrice: string;
  apt_balance: string;
}

interface Props {
  children?: ReactNode; // any props that come into the component
}

export const AptosContext = createContext<AppContextInterface | null>(null);
export const AptosContextProvider = ({ children, ...props }: Props) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [resources, setResources] = React.useState<Types.MoveResource[]>([]);
  const [userResources, setUserResources] = React.useState<Types.MoveResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<string>('');

  useEffect(() => {
    checkIsConnected(wallet);
  }, [wallet]);

  const handleConnect = async (wallet: string) => {
    try {
      if (wallet === 'petra') {
        await window.aptos.connect();
      } else if (wallet === 'martian') {
        await window.martian.connect();
      }
      setWallet(wallet);
      checkIsConnected(wallet);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (wallet === 'petra') await window.aptos.disconnect();
      else if (wallet === 'martian') await window.martian.disconnect();
      setWallet('');
      checkIsConnected(wallet);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIsConnected = async (wallet: string) => {
    if (wallet === 'petra') {
      const x = await window.aptos.isConnected();
      setIsConnected(x);
    } else if (wallet === 'martian') {
      const x = await window.martian.isConnected();
      setIsConnected(x);
    }
  };

  const Claim = async (amount: Number) => {
    if (wallet === '' || !isConnected) return;

    const petraTransaction = {
      arguments: [],
      function: protocol_address + '::arc::claim',
      type: 'entry_function_payload',
      type_arguments: [],
    };

    const sender = address;
    const payload = {
      arguments: [],
      function: protocol_address + '::arc::claim',
      type_arguments: [],
    };
    let transaction;

    if (wallet === 'petra') {
      transaction = petraTransaction;
    } else if (wallet === 'martian') {
      transaction = await window.martian.generateTransaction(sender, payload);

    }

    try {
      setIsLoading(true);
      if (isConnected && wallet === 'petra') {
        await window.aptos.signAndSubmitTransaction(transaction);
      } else if (isConnected && wallet === 'martian') {
        await window.martian.signAndSubmitTransaction(transaction);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Deposit1 = async (amount: Number) => {
    if (wallet === '' || !isConnected) return;
    const petraTransaction = {
      arguments: [amount],
      function: protocol_address + '::arc::lend',
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };

    const sender = address;
    const payload = {
      function: protocol_address + '::arc::lend',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: [amount],
    };
    let transaction;
    if (wallet === 'petra') {
      transaction = petraTransaction;
    }
    else if (wallet === 'martian') {
      transaction = await window.martian.generateTransaction(sender, payload);
    }
    try {
      setIsLoading(true);
      if (isConnected && wallet === 'petra') {
        await window.aptos.signAndSubmitTransaction(transaction);
      } else if (isConnected && wallet === 'martian') {
        await window.martian.signAndSubmitTransaction(transaction);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Deposit2 = async (amount: Number) => {
    if (wallet === '' || !isConnected) return;
    const petraTransaction = {
      arguments: [amount],
      function: protocol_address + '::arc::lend',
      type: 'entry_function_payload',
      type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
    };

    const sender = address;
    const payload = {
      arguments: [amount],
      function: protocol_address + '::arc::lend',
      type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
    };
    let transaction;
    if (wallet === 'petra') {
      transaction = petraTransaction;
    } else if (wallet === 'martian') {
      transaction = await window.martian.generateTransaction(sender, payload);
    }

    try {
      setIsLoading(true);
      if (isConnected && wallet === 'petra') {
        await window.aptos.signAndSubmitTransaction(transaction);
      } else {
        await window.martian.signAndSubmitTransaction(transaction);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Borrow1 = async (amount: Number) => {
    if (wallet === '' || !isConnected) return;
    const petraTransaction = {
      arguments: [amount],
      function: protocol_address + '::arc::borrow',
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    };

    const sender = address;
    const payload = {
      function: protocol_address + '::arc::borrow',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: [amount],
    };

    let transaction;
    if (wallet === 'petra') {
      transaction = petraTransaction;
    } else if (wallet === 'martian') {
      transaction = await window.martian.generateTransaction(sender, payload);
    }

    try {
      setIsLoading(true);
      if (isConnected && (wallet === 'petra')) {
        await window.aptos.signAndSubmitTransaction(transaction);
      } else {
        await window.martian.signAndSubmitTransaction(transaction);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Borrow2 = async (amount: Number) => {
    if (wallet === '' || !isConnected) return;
    const petraTransaction = {
      arguments: [amount],
      function: protocol_address + '::arc::borrow',
      type: 'entry_function_payload',
      type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
    };

    const sender = address;
    const payload = {
      arguments: [amount],
      function: protocol_address + '::arc::borrow',
      type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
    };

    let transaction;
    if (wallet === 'petra') {
      transaction = petraTransaction;
    } else if (wallet === 'martian') {
      transaction = await window.martian.generateTransaction(sender, payload);
    }

    try {
      setIsLoading(true);
      if (isConnected && (wallet === 'petra')) {
        await window.aptos.signAndSubmitTransaction(transaction);
      } else {
        await window.martian.signAndSubmitTransaction(transaction);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && (wallet === 'petra')) {
      window?.aptos.account().then((data: any) => {
        setAddress(data.address);

      });
    } else if (isConnected && (wallet === 'martian')) {
      window?.martian.account().then((data: any) => {
        setAddress(data.address);
      });
    } else {
      setAddress(null);
    }
  }, [isConnected, wallet]);

  useEffect(() => {
    async function fetchChainData() {
      await client.getAccountResources(protocol_address).then(setResources);
      if (address)
        await client.getAccountResources(address).then(setUserResources);
    }
    fetchChainData();
  }, [address, isLoading]);

  const resource1 = resources.find((r) => r.type === token1);
  const data1 = resource1?.data as
    | { borrowed_amount: string; deposited_amount: string; token: { value: string } }
    | undefined;

  const resource2 = resources.find((r) => r.type === token2);
  // console.log('resource3=================', resource2);
  const data2 = resource2?.data as
    | { borrowed_amount: string; deposited_amount: string; token: { value: string } }
    | undefined;

  const resource3 = userResources.find((r) => r.type === ticket);
  const data3 = resource3?.data as
    | { borrow_amount: string; lend_amount: string; last_interact_time: string }
    | undefined;

  const bal_resource = userResources.find((r) => r.type === balance);
  const bal_data = bal_resource?.data as { coin: { value: string } };

  const total_deposit1 = data1?.deposited_amount;
  const total_borrow1 = data1?.borrowed_amount;
  const value1 = data1?.token.value;

  const total_deposit2 = data2?.deposited_amount;
  const total_borrow2 = data2?.borrowed_amount;
  const value2 = data2?.token.value;

  const borrow_amount = data3?.borrow_amount;
  const lend_amount = data3?.lend_amount;
  const last_interact_time = data3?.last_interact_time;

  const apt_balance = bal_data?.coin.value;

  // const aptPrice = data3?.aptPrice;
  // const arcPrice = data3?.arcPrice;

  const datacontext: AppContextInterface = {
    total_deposit1: total_deposit1 || '0',
    total_deposit2: total_deposit2 || '0',
    value1: value1 || '0',
    total_borrow1: total_borrow1 || '0',
    total_borrow2: total_borrow2 || '0',
    value2: value2 || '0',
    borrow_amount: borrow_amount || '0',
    lend_amount: lend_amount || '0',
    last_interact_time: last_interact_time || '0',
    aptPrice: '0.5',
    arcPrice: '1',
    Deposit1: Deposit1,
    Deposit2: Deposit2,
    Borrow1: Borrow1,
    Borrow2: Borrow2,
    apt_balance: apt_balance,
    Claim,
    handleConnect: handleConnect,
    handleDisconnect: handleDisconnect,
    address: address,
    isConnected: isConnected,
  };

  return <AptosContext.Provider value={datacontext}>{children}</AptosContext.Provider>;
};
