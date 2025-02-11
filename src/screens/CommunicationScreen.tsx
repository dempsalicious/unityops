import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Channel {
  id: string;
  name: string;
  type: 'EMERGENCY' | 'TEAM' | 'GENERAL';
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  participants: number;
}

export default function CommunicationScreen() {
  const channels: Channel[] = [
    {
      id: '1',
      name: 'Flash Flood Response',
      type: 'EMERGENCY',
      unread: 5,
      lastMessage: 'Team A deployed to south sector',
      lastMessageTime: '2m ago',
      participants: 24,
    },
    {
      id: '2',
      name: 'Medical Team Alpha',
      type: 'TEAM',
      unread: 2,
      lastMessage: 'Supply status updated',
      lastMessageTime: '15m ago',
      participants: 12,
    },
    {
      id: '3',
      name: 'General Updates',
      type: 'GENERAL',
      unread: 0,
      lastMessage: 'Weather forecast for tomorrow',
      lastMessageTime: '1h ago',
      participants: 156,
    },
  ];

  const getChannelColor = (type: string) => {
    switch (type) {
      case 'EMERGENCY':
        return ['#FF416C', '#FF4B2B'];
      case 'TEAM':
        return ['#4776E6', '#8E54E9'];
      case 'GENERAL':
        return ['#56CCF2', '#2F80ED'];
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'EMERGENCY':
        return 'warning';
      case 'TEAM':
        return 'people';
      case 'GENERAL':
        return 'chatbubbles';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Communications</Text>
        <TouchableOpacity style={styles.newButton}>
          <Ionicons name="add-circle" size={24} color="#2F80ED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.channelList}>
        {channels.map((channel) => (
          <TouchableOpacity key={channel.id}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.channelCard}>
              <View style={styles.channelContent}>
                <View style={styles.channelHeader}>
                  <View style={styles.channelTitleContainer}>
                    <LinearGradient
                      colors={getChannelColor(channel.type)}
                      style={styles.iconContainer}>
                      <Ionicons name={getChannelIcon(channel.type)} size={20} color="white" />
                    </LinearGradient>
                    <Text style={styles.channelName}>{channel.name}</Text>
                  </View>
                  {channel.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{channel.unread}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.messagePreview}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {channel.lastMessage}
                  </Text>
                  <Text style={styles.timeStamp}>{channel.lastMessageTime}</Text>
                </View>

                <View style={styles.channelFooter}>
                  <View style={styles.participantsContainer}>
                    <MaterialCommunityIcons name="account-group" size={20} color="#666" />
                    <Text style={styles.participantsText}>{channel.participants} participants</Text>
                  </View>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>JOIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  newButton: {
    padding: 8,
  },
  channelList: {
    flex: 1,
  },
  channelCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  channelContent: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  unreadBadge: {
    backgroundColor: '#FF4B2B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lastMessage: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    marginRight: 8,
  },
  timeStamp: {
    color: '#999',
    fontSize: 12,
  },
  channelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 13,
  },
  joinButton: {
    backgroundColor: '#2F80ED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
