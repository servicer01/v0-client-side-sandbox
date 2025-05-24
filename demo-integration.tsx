"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, BarChart3 } from "lucide-react"
import AdminDashboard from "./admin-dashboard"
import ClientDemoInterface from "./client-demo-interface"

const DemoIntegration = () => {
  const [activeView, setActiveView] = useState("admin")
  const [selectedClient, setSelectedClient] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">AI Demo Management System</h1>
              <Badge variant="secondary">Live Environment</Badge>
            </div>
            <Tabs value={activeView} onValueChange={setActiveView} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="client" className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Client Demo</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Content */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsContent value="admin" className="m-0">
          <AdminDashboard />
        </TabsContent>
        <TabsContent value="client" className="m-0">
          <div className="p-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Client Demo Simulator</CardTitle>
                <CardDescription>
                  This is what your clients see during their personalized AI demo experience. Switch to the Admin
                  Dashboard to monitor this session in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setActiveView("admin")}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Monitor This Demo</span>
                  </Button>
                  <Badge variant="outline">Demo Session Active</Badge>
                </div>
              </CardContent>
            </Card>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <ClientDemoInterface />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DemoIntegration
