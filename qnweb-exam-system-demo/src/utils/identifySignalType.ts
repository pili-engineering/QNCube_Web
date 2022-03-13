import { InviteSignaling } from 'qnweb-high-level-rtc';

/**
 * 判断是否为邀请信令
 * @param signal
 */
export const isInvitationSignal = (signal: any): signal is InviteSignaling => {
  const actions = [
    'invite_send', 'invite_cancel', 'invite_accept', 'invite_reject',
  ];
  return actions.includes(signal.action);
};
