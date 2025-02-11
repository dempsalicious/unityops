import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Resource {
  id: string;
  name: string;
  type: 'MEDICAL' | 'VEHICLE' | 'SUPPLIES' | 'PERSONNEL';
  status: 'AVAILABLE' | 'IN_USE' | 'LOW' | 'CRITICAL';
  quantity: number;
  location: string;
  lastUpdated: string;
  allocated: number;
}

export default function ResourceScreen() {
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Emergency Medical Kits',
      type: 'MEDICAL',
      status: 'LOW',
      quantity: 25,
      location: 'Central Storage',
      lastUpdated: '5m ago',
      allocated: 18,
    },
    {
      id: '2',
      name: 'Rescue Vehicles',
      type: 'VEHICLE',
      status: 'AVAILABLE',
      quantity: 8,
      location: 'North Station',
      lastUpdated: '15m ago',
      allocated: 3,
    },
    {
      id: '3',
      name: 'Water Supplies',
      type: 'SUPPLIES',
      status: 'CRITICAL',
      quantity: 100,
      location: 'South Warehouse',
      lastUpdated: '1h ago',
      allocated: 95,
    },
    {
      id: '4',
      name: 'Emergency Response Team',
      type: 'PERSONNEL',
      status: 'IN_USE',
      quantity: 45,
      location: 'Multiple Locations',
      lastUpdated: '30m ago',
      allocated: 38,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return ['#27AE60', '#219653'];
      case 'IN_USE':
        return ['#F2994A', '#F2C94C'];
      case 'LOW':
        return ['#FF9800', '#F57C00'];
      case 'CRITICAL':
        return ['#FF416C', '#FF4B2B'];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MEDICAL':
        return 'medical-bag';
      case 'VEHICLE':
        return 'truck-emergency';
      case 'SUPPLIES':
        return 'package-variant';
      case 'PERSONNEL':
        return 'account-group';
    }
  };

  const calculateUsagePercentage = (allocated: number, total: number) => {
    return (allocated / total) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#2F80ED" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resourceList}>
        {resources.map((resource) => (
          <TouchableOpacity key={resource.id}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.resourceCard}>
              <View style={styles.resourceContent}>
                <View style={styles.resourceHeader}>
                  <View style={styles.resourceTitleContainer}>
                    <MaterialCommunityIcons
                      name={getTypeIcon(resource.type)}
                      size={24}
                      color="#2F80ED"
                    />
                    <Text style={styles.resourceName}>{resource.name}</Text>
                  </View>
                  <LinearGradient
                    colors={getStatusColor(resource.status)}
                    style={styles.statusBadge}>
                    <Text style={styles.statusText}>{resource.status}</Text>
                  </LinearGradient>
                </View>

                <View style={styles.locationContainer}>
                  <Ionicons name="location-sharp" size={16} color="#666" />
                  <Text style={styles.location}>{resource.location}</Text>
                </View>

                <View style={styles.statsContainer}>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Available</Text>
                    <Text style={styles.quantityValue}>{resource.quantity}</Text>
                  </View>
                  <View style={styles.allocatedContainer}>
                    <Text style={styles.allocatedLabel}>Allocated</Text>
                    <Text style={styles.allocatedValue}>{resource.allocated}</Text>
                  </View>
                </View>

                <View style={styles.usageContainer}>
                  <View style={styles.usageBarBackground}>
                    <View
                      style={[
                        styles.usageBarFill,
                        {
                          width: `${calculateUsagePercentage(
                            resource.allocated,
                            resource.quantity
                          )}%`,
                          backgroundColor: getStatusColor(resource.status)[0],
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.lastUpdated}>Updated {resource.lastUpdated}</Text>
                </View>

                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>ALLOCATE</Text>
                </TouchableOpacity>
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
  filterButton: {
    padding: 8,
  },
  resourceList: {
    flex: 1,
  },
  resourceCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resourceContent: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityContainer: {
    flex: 1,
  },
  allocatedContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  quantityLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  allocatedLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  allocatedValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  usageContainer: {
    marginBottom: 16,
  },
  usageBarBackground: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  lastUpdated: {
    color: '#999',
    fontSize: 12,
    textAlign: 'right',
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
