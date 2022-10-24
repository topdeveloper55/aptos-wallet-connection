import React, { useState, useContext } from 'react';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AptosContext } from '../context/aptosContext';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import moment from 'moment';
import Logo from '../asset/icons/Logo.png';
import Arco from '../asset/icons/Arco.png';
import Alter from '../asset/icons/alter.svg';
import Petra from '../asset/icons/Petra.jpg';
import Martian from '../asset/icons/Martian.jpg';
import Pickaxe from '../asset/icons/pickaxe.svg';
import Document from '../asset/icons/document.svg';
import Dashbord from '../asset/icons/dashboard.svg';
import Doc from '../asset/icons/book-of-black-cover-closed.svg';

export default function Layout(props: {
  children:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const aptosContext = useContext(AptosContext);

  const address = aptosContext?.address;
  const handleDisconnect = aptosContext?.handleDisconnect;
  const handleConnect = aptosContext?.handleConnect;
  const last_interact_time = moment.unix(parseInt(aptosContext?.last_interact_time ?? '0'));
  const current_time = moment();
  const interval = current_time.diff(last_interact_time, 'minutes');
  const isConnected = aptosContext?.isConnected;
  const apt_balance = aptosContext?.apt_balance || '0';
  const claim_amount = Number(aptosContext?.lend_amount) * interval;

  const [open, setOpen] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Claim = () => {
    aptosContext?.Claim();
    setOpen(false);
  };
  const handleClickOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };
  const middleConnect = async (wallet: string) => {
    handleConnect(wallet);
    handleCloseWallet();
  };
  const petraHandleConnect = async () => {
    await middleConnect('petra');
  };
  const martianHandleConnect = async () => {
    await middleConnect('martian');
  };
  const isHandleDisconnect = async () => {
    await handleDisconnect();
  };

  return (
    <div className="w-full min-h-screen h-full bg-background flex flex-row items-center justify-center bg-opacity-20">
      <Dialog
        open={openWallet}
        onClose={handleCloseWallet}
        fullWidth={true}
        maxWidth={'xs'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="bg-text-blur py-4 space-y-4">
          <span className="font-bold text-xl text-white">Connect a Wallet</span>
        </DialogTitle>
        <DialogContent className="bg-background">
          <div className="flex flex-col space-y-2 py-2 items-center justify-center">
            {!window.aptos ? (
              <a
                href="https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
              >
                <span className="font-semibold text-base">Petra</span>
                <img src={Petra} alt="" className="w-6 h-6 rounded object-scale-down" />
              </a>
            ) : (
              <div
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
                onClick={petraHandleConnect}
              >
                <span className="font-semibold text-base">Petra</span>
                <img src={Petra} alt="" className="w-6 h-6 rounded object-scale-down" />
              </div>
            )}
            {!window.martian ? (
              <a
                href="https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
              >
                <span className="font-semibold text-base">Martian</span>
                <img src={Martian} alt="" className="w-6 h-6 rounded object-scale-down" />
              </a>
            ) : (
              <div
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
                onClick={martianHandleConnect}
              >
                <span className="font-semibold text-base">Martian</span>
                <img src={Martian} alt="" className="w-6 h-6 rounded object-scale-down" />
              </div>
            )}

            <span>Need to Help to connect Wallet ?</span>
          </div>
        </DialogContent>
      </Dialog>
      <div className="h-screen overflow-y-auto rel">
        <div className="w-[calc(100%)] bg-[#f8f9fb] z-50 px-10 py-4 border-b-2 border-solid border-divider flex flex-row items-center justify-between space-x-4 fixed top-0 right-0">
          <div className="flex-1 space-x-4 items-center justify-center pr-6">
          </div>
          <img
            src={Pickaxe}
            alt=""
            onClick={handleClickOpen}
            className="w-8 h-8 rounded-full bg-white p-2 shadow-lg cursor-pointer"
          />
          <div className="h-full bg-text-blur bg-opacity-20 rounded-full p-2 space-x-4">
            <span className="text-base font-semibold ml-2">Aptos</span>
            {!isConnected ? (
              <button className="px-4 bg-white rounded-full py-1" onClick={handleClickOpenWallet}>
                Connect Wallet
              </button>
            ) : (
              <button className="px-4 bg-white rounded-full py-1" onClick={isHandleDisconnect}>
                {address?.slice(0, 4) + '...' + address?.slice(-4)}
              </button>
            )}
          </div>
        </div>
        <div className="w-full px-10 py-4 mt-36">{props.children}</div>
      </div>
    </div>
  );
}
