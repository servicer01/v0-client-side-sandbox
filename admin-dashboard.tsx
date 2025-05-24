"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Play,
  Clock,
  TrendingUp,
  MessageCircle,
  Eye,
  Bell,
  Search,
  Calendar,
  DollarSign,
  Target,
  Activity,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Zap,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react"

// Simulated real-time data store
const demoStore = {
  activeDemos: new Map(),
  subscribers: new Set(),

  subscribe(callback) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  },

  notify() {
    this.subscribers.forEach((callback) => callback(Array.from(this.activeDemos.values())))
  },

  updateDemo(demoId, updates) {
    const existing = this.activeDemos.get(demoId) || {}
    this.activeDemos.set(demoId, { ...existing, ...updates })
    this.notify()
  },

  removeDemo(demoId) {
    this.activeDemos.delete(demoId)
    this.notify()
  },
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [liveDemos, setLiveDemos] = useState([])
  const [notifications, setNotifications] = useState([])
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [showDemoViewer, setShowDemoViewer] = useState(false)

  // Subscribe to real-time demo updates
  useEffect(() => {
    const unsubscribe = demoStore.subscribe(setLiveDemos)

    // Initialize with mock data
    demoStore.updateDemo(1, {
      id: 1,
      clientName: "Sarah's Bistro",
      clientEmail: "sarah@sarahsbistro.com",
      clientPhone: "(417) 555-0123",
      package: "kickstart",
      startTime: new Date(Date.now() - 8 * 60000),
      currentStep: 2,
      totalSteps: 5,
      currentFeature: "Social Media Generator",
      engagementScore: 85,
      timeSpent: 8,
      status: "highly_engaged",
      interactions: 12,
      generatedContent: ["3 social posts", "2 headlines"],
      location: "Branson, MO",
      businessType: "Restaurant",
    })

    demoStore.updateDemo(2, {
      id: 2,
      clientName: "Johnson Dental",
      clientEmail: "info@johnsondental.com",
      clientPhone: "(417) 555-0456",
      package: "connection",
      startTime: new Date(Date.now() - 15 * 60000),
      currentStep: 3,
      totalSteps: 4,
      currentFeature: "FAQ Builder",
      engagementScore: 92,
      timeSpent: 15,
      status: "highly_engaged",
      interactions: 18,
      generatedContent: ["FAQ section", "Chatbot responses"],
      location: "Springfield, MO",
      businessType: "Healthcare",
    })

    demoStore.updateDemo(3, {
      id: 3,
      clientName: "Metro Consulting",
      clientEmail: "contact@metroconsulting.com",
      clientPhone: "(417) 555-0789",
      package: "efficiency",
      startTime: new Date(Date.now() - 3 * 60000),
      currentStep: 1,
      totalSteps: 4,
      currentFeature: "Document Generator",
      engagementScore: 45,
      timeSpent: 3,
      status: "browsing",
      interactions: 2,
      generatedContent: [],
      location: "Kansas City, MO",
      businessType: "Consulting",
    })

    return unsubscribe
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      liveDemos.forEach((demo) => {
        if (demo.status === "highly_engaged") {
          demoStore.updateDemo(demo.id, {
            timeSpent: demo.timeSpent + 1,
            interactions: demo.interactions + Math.random() > 0.7 ? 1 : 0,
            engagementScore: Math.min(100, demo.engagementScore + (Math.random() > 0.8 ? 1 : 0)),
          })
        }
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [liveDemos])

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "high_engagement",
        message: "Johnson Dental spent 12+ mins on FAQ Builder",
        time: "2 mins ago",
        action: "Send follow-up",
        priority: "high",
      },
      {
        id: 2,
        type: "demo_completed",
        message: "Mike's Auto Shop completed Kickstart demo",
        time: "15 mins ago",
        action: "Schedule call",
        priority: "medium",
      },
      {
        id: 3,
        type: "new_signup",
        message: "New discovery session scheduled for tomorrow",
        time: "1 hour ago",
        action: "Prepare demo",
        priority: "low",
      },
      {
        id: 4,
        type: "stuck_user",
        message: "Metro Consulting hasn't progressed in 5 minutes",
        time: "Just now",
        action: "Offer help",
        priority: "high",
      },
    ])
  }, [])

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change.positive ? "text-green-600" : "text-red-600"} flex items-center mt-1`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  )

  const LiveDemoCard = ({ demo }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "highly_engaged":
          return "bg-green-100 text-green-800 border-green-200"
        case "browsing":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "stuck":
          return "bg-red-100 text-red-800 border-red-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }

    const getPackageColor = (pkg) => {
      switch (pkg) {
        case "kickstart":
          return "bg-blue-100 text-blue-800"
        case "connection":
          return "bg-purple-100 text-purple-800"
        case "efficiency":
          return "bg-green-100 text-green-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }

    const progressPercentage = (demo.currentStep / demo.totalSteps) * 100

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{demo.clientName}</h4>
              <p className="text-sm text-gray-600">
                {demo.businessType} • {demo.location}
              </p>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPackageColor(demo.package)}`}
              >
                {demo.package} plan
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(demo.status)}`}
            >
              <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
              {demo.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress:</span>
            <span className="font-medium text-gray-900">
              Step {demo.currentStep} of {demo.totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Feature:</span>
            <span className="font-medium text-gray-900">{demo.currentFeature}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time Spent:</span>
            <span className="font-medium text-gray-900">{demo.timeSpent} minutes</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Interactions:</span>
            <span className="font-medium text-gray-900">{demo.interactions} actions</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Engagement:</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${demo.engagementScore}%` }}
                ></div>
              </div>
              <span className="font-medium text-gray-900">{demo.engagementScore}%</span>
            </div>
          </div>

          {demo.generatedContent.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Generated:</span>
              <span className="font-medium text-gray-900">{demo.generatedContent.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedDemo(demo)
              setShowDemoViewer(true)
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>Watch Live</span>
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>Message</span>
          </button>
          <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const NotificationItem = ({ notification }) => {
    const getIcon = (type) => {
      switch (type) {
        case "high_engagement":
          return <Zap className="w-4 h-4 text-yellow-600" />
        case "demo_completed":
          return <CheckCircle className="w-4 h-4 text-green-600" />
        case "new_signup":
          return <User className="w-4 h-4 text-blue-600" />
        case "stuck_user":
          return <AlertCircle className="w-4 h-4 text-red-600" />
        default:
          return <Bell className="w-4 h-4 text-gray-600" />
      }
    }

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-700 border-red-200"
        case "medium":
          return "bg-yellow-100 text-yellow-700 border-yellow-200"
        case "low":
          return "bg-blue-100 text-blue-700 border-blue-200"
        default:
          return "bg-gray-100 text-gray-700 border-gray-200"
      }
    }

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0">{getIcon(notification.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
        <button
          className={`text-xs px-2 py-1 rounded-md border transition-colors ${getPriorityColor(notification.priority)}`}
        >
          {notification.action}
        </button>
      </div>
    )
  }

  const DemoViewer = ({ demo, onClose }) => {
    if (!demo) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Live Demo Viewer</h3>
              <p className="text-gray-600">
                {demo.clientName} - {demo.currentFeature}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">Live Session Active</span>
              </div>
              <p className="text-sm text-gray-600">
                Client is currently viewing: <strong>{demo.currentFeature}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Session Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Duration:</span>
                    <span className="font-medium">{demo.timeSpent} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Engagement:</span>
                    <span className="font-medium">{demo.engagementScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Interactions:</span>
                    <span className="font-medium">{demo.interactions}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Client Info</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3 text-green-700" />
                    <span className="text-green-700">{demo.clientEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-green-700" />
                    <span className="text-green-700">{demo.clientPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-green-700" />
                    <span className="text-green-700">{demo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Client</span>
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Follow-up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Solutions Command Center</h1>
                <p className="text-gray-600">Monitor demos, track engagement, and manage client success</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter((n) => n.priority === "high").length}
                </span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>New Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Demos"
            value={liveDemos.length.toString()}
            change={{ positive: true, value: "+2 from yesterday" }}
            icon={Activity}
            color="green"
          />
          <StatCard
            title="This Week's Revenue"
            value="$4,247"
            change={{ positive: true, value: "+18% from last week" }}
            icon={DollarSign}
            color="blue"
          />
          <StatCard
            title="Conversion Rate"
            value="68%"
            change={{ positive: true, value: "+5% this month" }}
            icon={Target}
            color="purple"
          />
          <StatCard
            title="Avg Demo Time"
            value="12.5min"
            change={{ positive: false, value: "-2min from last week" }}
            icon={Clock}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Demos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Live Demos ({liveDemos.length})
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
              </div>
              <div className="p-6">
                {liveDemos.length > 0 ? (
                  <div className="space-y-6">
                    {liveDemos.map((demo) => (
                      <LiveDemoCard key={demo.id} demo={demo} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Demos</h4>
                    <p className="text-gray-600 mb-4">Start a new demo session to see live activity here</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Launch Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Smart Notifications</h3>
              </div>
              <div className="p-3">
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Schedule Discovery Call</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Play className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Launch Quick Demo</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">View All Clients</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Analytics Dashboard</span>
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Discovery Call - TechStart Inc</p>
                    <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Demo Setup - Local Dental</p>
                    <p className="text-sm text-gray-600">4:30 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Viewer Modal */}
      {showDemoViewer && <DemoViewer demo={selectedDemo} onClose={() => setShowDemoViewer(false)} />}
    </div>
  )
}

export default AdminDashboard
