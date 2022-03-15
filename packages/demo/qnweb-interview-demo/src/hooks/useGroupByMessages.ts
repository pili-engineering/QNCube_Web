import { Message, MessageBody } from '@/hooks/useQNIM';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';

export interface GroupByMessage {
  dateTitle: string;
  list: (Omit<Message, 'content'> & { content: MessageBody })[];
}

const useGroupByMessages = (messages: Message[]) => {
  const [groupByMessages, setGroupByMessages] = useState<GroupByMessage[]>([]);

  useEffect(() => {
    const groupByMessages = _.map(
      _.toPairs(
        _.groupBy(
          _.map(messages, message => {
            return {
              ...message,
              dateTitle: dayjs(+message.timestamp).format('YYYY-MM-DD')
            }
          }),
          'dateTitle'
        )
      ),
      ([dateTitle, list]) => {
        return {
          dateTitle,
          list: _.sortBy(list, 'timestamp').map(message => {
            return {
              ...message,
              content: JSON.parse(message.content) as MessageBody
            }
          })
        }
      }
    )
    console.log('groupByMessages', groupByMessages)
    setGroupByMessages(groupByMessages);
  }, [messages]);
  return [
    groupByMessages
  ]
}

export default useGroupByMessages;