"use client"
import React, { useState, useEffect } from 'react'

const Analysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const analyticsData = {
    overview: {
      totalUsers: 1248,
      activeUsers: 892,
      newUsers: 156,
      bounceRate: 32.4,
      avgSessionDuration: '4m 23s',
      pageViews: 8456,
      uniquePageViews: 6234,
      conversionRate: 3.2
    },
    traffic: {
      direct: 2847,
      organic: 3421,
      social: 1256,
      referral: 892,
      email: 540
    },
    devices: {
      desktop: 5234,
      mobile: 2890,
      tablet: 332
    },
    browsers: {
      chrome: 45.2,
      safari: 28.7,
      firefox: 12.3,
      edge: 8.4,
      other: 5.4
    },
    topPages: [
      { page: '/home', views: 2341, uniqueViews: 1892, avgTime: '3m 12s', bounceRate: 28.4 },
      { page: '/products', views: 1876, uniqueViews: 1456, avgTime: '4m 45s', bounceRate: 31.2 },
      { page: '/about', views: 1234, uniqueViews: 987, avgTime: '2m 34s', bounceRate: 42.1 },
      { page: '/contact', views: 876, uniqueViews: 743, avgTime: '1m 56s', bounceRate: 38.7 },
      { page: '/blog', views: 654, uniqueViews: 543, avgTime: '5m 12s', bounceRate: 24.3 }
    ],
    conversionFunnel: [
      { stage: 'Visitors', count: 8456, conversion: 100 },
      { stage: 'Sign-ups', count: 2341, conversion: 27.7 },
      { stage: 'Active Users', count: 1567, conversion: 18.5 },
      { stage: 'Premium', count: 267, conversion: 3.2 }
    ]
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and analyze your website performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
          <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.activeUsers)}</p>
          <p className="text-sm text-green-600 mt-1">+8.3% from last period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Page Views</p>
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.pageViews)}</p>
          <p className="text-sm text-green-600 mt-1">+15.7% from last period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.overview.conversionRate)}</p>
          <p className="text-sm text-red-600 mt-1">-2.1% from last period</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {Object.entries(analyticsData.traffic).map(([source, count]) => {
              const total = Object.values(analyticsData.traffic).reduce((sum, val) => sum + val, 0)
              const percentage = ((count / total) * 100).toFixed(1)
              const colors = {
                direct: 'bg-blue-500',
                organic: 'bg-green-500',
                social: 'bg-purple-500',
                referral: 'bg-orange-500',
                email: 'bg-red-500'
              }
              const sourceColors = {
                direct: 'text-blue-600',
                organic: 'text-green-600',
                social: 'text-purple-600',
                referral: 'text-orange-600',
                email: 'text-red-600'
              }
              
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[source as keyof typeof colors]}`}></div>
                    <span className="text-sm font-medium text-gray-900 capitalize">{source}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[source as keyof typeof colors]} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold ${sourceColors[source as keyof typeof sourceColors]}`}>
                      {percentage}%
                    </span>
                    <span className="text-sm text-gray-600">{formatNumber(count)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(analyticsData.devices).map(([device, count]) => {
              const total = Object.values(analyticsData.devices).reduce((sum, val) => sum + val, 0)
              const percentage = ((count / total) * 100).toFixed(1)
              const deviceIcons = {
                desktop: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                mobile: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
                tablet: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
              }
              const colors = {
                desktop: 'bg-blue-500',
                mobile: 'bg-green-500',
                tablet: 'bg-purple-500'
              }
              
              return (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className={`w-5 h-5 ${colors[device as keyof typeof colors]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={deviceIcons[device as keyof typeof deviceIcons]} />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 capitalize">{device}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[device as keyof typeof colors]} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    <span className="text-sm text-gray-600">{formatNumber(count)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Page</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Unique Views</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Avg. Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topPages.map((page, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatNumber(page.views)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{formatNumber(page.uniqueViews)}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{page.avgTime}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      page.bounceRate > 40 ? 'text-red-600' : 
                      page.bounceRate > 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {formatPercentage(page.bounceRate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
        <div className="space-y-4">
          {analyticsData.conversionFunnel.map((stage, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32">
                <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                <p className="text-xs text-gray-600">{formatNumber(stage.count)} users</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-8 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${stage.conversion}%` }}
                  >
                    <span className="text-xs font-medium text-white">{formatPercentage(stage.conversion)}</span>
                  </div>
                </div>
              </div>
              {index < analyticsData.conversionFunnel.length - 1 && (
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analysis