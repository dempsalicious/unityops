import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EmergencyMessage {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  location: string;
  timestamp: string;
  description: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  respondents: number;
}

export default function EmergencyCard() {
  const [expanded, setExpanded] = useState(false);
  const [message] = useState<EmergencyMessage>({
    priority: 'HIGH',
    title: 'Flash Flood Warning',
    location: 'Downtown District',
    timestamp: '10:45 AM',
    description: 'Multiple streets flooded. Immediate evacuation required. Emergency responders needed for rescue operations.',
    status: 'NEW',
    respondents: 8,
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return ['#FF416C', '#FF4B2B'];
      case 'MEDIUM':
        return ['#F2994A', '#F2C94C'];
      case 'LOW':
        return ['#56CCF2', '#2F80ED'];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return '#FF4B2B';
      case 'IN_PROGRESS':
        return '#F2C94C';
      case 'RESOLVED':
        return '#27AE60';
    }
  };

  return (
    <Pressable onPress={() => setExpanded(!expanded)}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
        style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <LinearGradient
              colors={getPriorityColor(message.priority)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.priorityBadge}>
              <Text style={styles.priorityText}>{message.priority}</Text>
            </LinearGradient>
            <View style={styles.timestamp}>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
              <Text style={styles.timestampText}>{message.timestamp}</Text>
            </View>
          </View>

          <Text style={styles.title}>{message.title}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color="#666" />
            <Text style={styles.location}>{message.location}</Text>
          </View>

          {expanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.description}>{message.description}</Text>
              <View style={styles.footer}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(message.status) }]} />
                  <Text style={styles.statusText}>{message.status.replace('_', ' ')}</Text>
                </View>
                <View style={styles.respondentsContainer}>
                  <MaterialCommunityIcons name="account-group" size={20} color="#666" />
                  <Text style={styles.respondentsText}>{message.respondents} Responding</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {}}>
            <Text style={styles.actionButtonText}>RESPOND</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  priorityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  timestamp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '500',
  },
  respondentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  respondentsText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 13,
  },
  actionButton: {
    backgroundColor: '#2F80ED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
