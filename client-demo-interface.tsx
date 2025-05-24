"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  RotateCcw,
  Share2,
  ThumbsUp,
  MessageCircle,
  Clock,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  FileText,
  MessageSquare,
  Eye,
  Copy,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"

const ClientDemoInterface = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])
  const [generatedContent, setGeneratedContent] = useState({})
  const [timeSpent, setTimeSpent] = useState(0)
  const [packageType] = useState("kickstart") // This would come from props/context
  const [businessInfo] = useState({
    name: "Sarah's Bistro",
    type: "Local Restaurant",
    location: "Branson, MO",
  })

  // Demo steps configuration based on package type
  const demoSteps = {
    kickstart: [
      {
        id: "welcome",
        title: "Welcome to Your AI Marketing Revolution",
        subtitle: "See how AI can transform your content creation in the next 15 minutes",
        component: "WelcomeStep",
        duration: 2,
        description: "Quick overview of what you'll experience",
      },
      {
        id: "social_generator",
        title: "AI Social Media Post Generator",
        subtitle: "Generate engaging posts for your business in seconds",
        component: "SocialMediaGenerator",
        duration: 5,
        description: "Create 10+ post ideas tailored to your restaurant",
      },
      {
        id: "headline_creator",
        title: "Compelling Headlines & CTAs",
        subtitle: "AI-powered headlines that convert browsers to customers",
        component: "HeadlineCreator",
        duration: 4,
        description: "Generate attention-grabbing headlines for ads and promotions",
      },
      {
        id: "website_copy",
        title: "Website Copy Enhancement",
        subtitle: "Professional website content that tells your story",
        component: "WebsiteCopyGenerator",
        duration: 3,
        description: "AI-drafted copy for your About Us and Services pages",
      },
      {
        id: "seo_optimizer",
        title: "Local SEO Keyword Magic",
        subtitle: "Get found by local customers with AI-powered keywords",
        component: "SEOOptimizer",
        duration: 3,
        description: "Discover the keywords that will bring customers to your door",
      },
    ],
    connection: [
      {
        id: "welcome",
        title: "Smart Customer Service Revolution",
        subtitle: "Transform how you handle customer inquiries with AI",
        component: "WelcomeStep",
        duration: 2,
      },
      {
        id: "faq_builder",
        title: "Intelligent FAQ Generator",
        subtitle: "Turn common questions into helpful resources",
        component: "FAQBuilder",
        duration: 4,
      },
      {
        id: "chatbot_creator",
        title: "AI Chatbot Script Builder",
        subtitle: "Automate responses while maintaining your personal touch",
        component: "ChatbotCreator",
        duration: 4,
      },
      {
        id: "review_manager",
        title: "Review Response Generator",
        subtitle: "Professional responses for positive and negative reviews",
        component: "ReviewManager",
        duration: 4,
      },
    ],
    efficiency: [
      {
        id: "welcome",
        title: "Operational Efficiency Transformation",
        subtitle: "See how AI can save hours of administrative work",
        component: "WelcomeStep",
        duration: 2,
      },
      {
        id: "document_generator",
        title: "Smart Document Creation",
        subtitle: "Generate professional documents in minutes, not hours",
        component: "DocumentGenerator",
        duration: 3,
      },
      {
        id: "data_summarizer",
        title: "Intelligent Data Analysis",
        subtitle: "Turn complex reports into actionable insights",
        component: "DataSummarizer",
        duration: 3,
      },
      {
        id: "automation_finder",
        title: "Task Automation Discovery",
        subtitle: "Identify opportunities to automate repetitive work",
        component: "AutomationFinder",
        duration: 4,
      },
    ],
  }

  const currentSteps = demoSteps[packageType]
  const currentStepData = currentSteps[currentStep]
  const progress = ((currentStep + 1) / currentSteps.length) * 100

  // Timer effect
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep < currentSteps.length - 1) {
      const timer = setTimeout(() => {
        handleNextStep()
      }, currentStepData.duration * 60000) // Convert minutes to milliseconds
      return () => clearTimeout(timer)
    }
  }, [currentStep, isPlaying])

  const handleNextStep = () => {
    if (currentStep < currentSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Component renderers for different demo steps
  const WelcomeStep = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to Your Personalized AI Demo, {businessInfo.name}!
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        You're about to see exactly how AI can solve your biggest challenges and save you hours every week. This demo is
        customized specifically for your {businessInfo.type.toLowerCase()} in {businessInfo.location}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {currentSteps.slice(1).map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setIsPlaying(true)
          handleNextStep()
        }}
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center space-x-2 mx-auto"
      >
        <Play className="w-5 h-5" />
        <span>Start Your Demo Experience</span>
      </button>
    </div>
  )

  const SocialMediaGenerator = () => {
    const [generatingPosts, setGeneratingPosts] = useState(false)
    const [selectedPlatform, setSelectedPlatform] = useState("facebook")

    const samplePosts = {
      facebook: [
        "🍽️ Fresh, local ingredients meet culinary passion at Sarah's Bistro! Tonight's special: Pan-seared salmon with seasonal vegetables. What's your favorite way to enjoy fresh fish? #BransonEats #LocalFresh",
        "☕ Monday morning fuel! Start your week right with our signature breakfast blend and homemade pastries. Open at 7 AM - see you bright and early! #MondayMotivation #BreakfastGoals",
        "🎉 Customer spotlight! 'The best dining experience in Branson - Sarah's Bistro never disappoints!' - Jennifer K. Thank you for making our day! ⭐⭐⭐⭐⭐ #HappyCustomers",
      ],
      instagram: [
        "Farm to table isn't just a trend - it's our promise 🌱 Every dish tells the story of local farmers and artisans. #FarmToTable #BransonEats #LocalLove",
        "Behind the scenes magic ✨ Chef prepping tonight's specials with the same care and passion as always #ChefLife #BehindTheScenes #HandCrafted",
        "Weekend vibes at Sarah's Bistro 🍷 Perfect spot for date night or celebrating with friends. Reserve your table! #WeekendVibes #DateNight",
      ],
      twitter: [
        "Quick lunch break? Our express menu gets you fed and back to work in 30 minutes! ⚡ #QuickBites #LunchRush #BransonMO",
        "Rainy day = perfect soup weather! Try our signature tomato basil with fresh herbs 🍅 #ComfortFood #RainyDay",
        "Thank you to everyone who made last night's wine tasting a success! 🍷 Next event: March 15th #WineTasting #Community",
      ],
    }

    const handleGenerate = () => {
      setGeneratingPosts(true)
      setTimeout(() => {
        setGeneratedContent({
          ...generatedContent,
          socialPosts: samplePosts[selectedPlatform],
        })
        setGeneratingPosts(false)
      }, 2000)
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Social Media Post Generator</h2>
          <p className="text-gray-600">
            Watch as AI creates engaging, on-brand social media content specifically for {businessInfo.name}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Platform Selection</h3>
            <div className="flex space-x-2">
              {["facebook", "instagram", "twitter"].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPlatform === platform
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generatingPosts}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {generatingPosts ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Posts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Posts</span>
              </>
            )}
          </button>
        </div>

        {generatedContent.socialPosts && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Posts for {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
            </h3>
            {generatedContent.socialPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">Post {index + 1}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{post}</p>
                <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const HeadlineCreator = () => {
    const [generatingHeadlines, setGeneratingHeadlines] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("promotions")

    const sampleHeadlines = {
      promotions: [
        "Save 25% This Week Only - Fresh Flavors Await at Sarah's Bistro!",
        "Limited Time: Buy One Entrée, Get Appetizer FREE!",
        "Weekend Special: 3-Course Dinner for Just $29.99",
        "Happy Hour Extended: Half-Price Drinks Until 7 PM!",
      ],
      events: [
        "Wine & Dine Night: March 15th - Reserve Your Table Now!",
        "Live Jazz Every Friday - Dinner & Music Under One Roof",
        "Chef's Table Experience: Behind-the-Scenes Culinary Journey",
        "Mother's Day Brunch: Treat Mom to Something Special",
      ],
      seasonal: [
        "Spring Menu Launch: Fresh Ingredients, Bold New Flavors",
        "Summer Patio Dining: Al Fresco Under the Stars",
        "Harvest Season: Farm-Fresh Ingredients at Their Peak",
        "Holiday Catering: Let Us Handle Your Special Occasions",
      ],
    }

    const handleGenerate = () => {
      setGeneratingHeadlines(true)
      setTimeout(() => {
        setGeneratedContent({
          ...generatedContent,
          headlines: sampleHeadlines[selectedCategory],
        })
        setGeneratingHeadlines(false)
      }, 1500)
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Headline & CTA Generator</h2>
          <p className="text-gray-600">Create compelling headlines that drive action and increase conversions</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Campaign Type</h3>
            <div className="flex space-x-2">
              {["promotions", "events", "seasonal"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generatingHeadlines}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {generatingHeadlines ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Headlines...</span>
              </>
            ) : (
              <>
                <Target className="w-5 h-5" />
                <span>Generate {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Headlines</span>
              </>
            )}
          </button>
        </div>

        {generatedContent.headlines && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Headlines</h3>
            {generatedContent.headlines.map((headline, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-500">Conversion-Optimized</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 leading-relaxed">{headline}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">High Impact</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600">Attention-Grabbing</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const WebsiteCopyGenerator = () => {
    const [generatingCopy, setGeneratingCopy] = useState(false)
    const [selectedSection, setSelectedSection] = useState("about")

    const sampleCopy = {
      about: {
        title: "About Sarah's Bistro",
        content:
          "Nestled in the heart of Branson, Missouri, Sarah's Bistro has been serving exceptional farm-to-table cuisine since 2018. Our passion for fresh, locally-sourced ingredients and innovative culinary techniques creates an unforgettable dining experience that celebrates the rich flavors of the Ozarks.\n\nChef Sarah Martinez brings over 15 years of culinary expertise, combining traditional techniques with modern creativity. Every dish tells a story of our commitment to quality, sustainability, and the vibrant local community that makes Branson special.",
      },
      services: {
        title: "Our Services",
        content:
          "• Fine Dining: Intimate dinner experiences with seasonal menus\n• Private Events: Customized catering for special occasions\n• Wine Tastings: Curated selections from local and international vineyards\n• Cooking Classes: Learn from our expert chefs in hands-on sessions\n• Corporate Catering: Professional service for business events\n• Weekend Brunch: Elevated breakfast and lunch offerings",
      },
      menu: {
        title: "Our Philosophy",
        content:
          "At Sarah's Bistro, we believe great food starts with great ingredients. Our menu changes seasonally to showcase the best local produce, sustainably-sourced proteins, and artisanal products from Missouri farmers and producers.\n\nFrom our signature wood-fired steaks to our house-made pasta, every dish is crafted with attention to detail and a commitment to excellence that has made us Branson's premier dining destination.",
      },
    }

    const handleGenerate = () => {
      setGeneratingCopy(true)
      setTimeout(() => {
        setGeneratedContent({
          ...generatedContent,
          websiteCopy: sampleCopy[selectedSection],
        })
        setGeneratingCopy(false)
      }, 2000)
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Copy Generator</h2>
          <p className="text-gray-600">Professional website content that tells your story and converts visitors</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Page Section</h3>
            <div className="flex space-x-2">
              {["about", "services", "menu"].map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSection === section
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generatingCopy}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {generatingCopy ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Crafting Copy...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} Copy</span>
              </>
            )}
          </button>
        </div>

        {generatedContent.websiteCopy && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{generatedContent.websiteCopy.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <div className="prose prose-gray max-w-none">
              {generatedContent.websiteCopy.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">SEO Optimized</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">Conversion Focused</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-600">
                <Star className="w-4 h-4" />
                <span className="text-sm">Brand Aligned</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const SEOOptimizer = () => {
    const [generatingKeywords, setGeneratingKeywords] = useState(false)
    const [selectedFocus, setSelectedFocus] = useState("local")

    const sampleKeywords = {
      local: [
        { keyword: "best restaurant Branson MO", volume: "1,200", difficulty: "Medium", opportunity: "High" },
        { keyword: "fine dining Branson Missouri", volume: "800", difficulty: "Low", opportunity: "High" },
        { keyword: "farm to table restaurant Branson", volume: "600", difficulty: "Low", opportunity: "Very High" },
        { keyword: "romantic dinner Branson", volume: "900", difficulty: "Medium", opportunity: "High" },
        { keyword: "Branson bistro", volume: "400", difficulty: "Low", opportunity: "Very High" },
      ],
      cuisine: [
        { keyword: "fresh seafood Branson", volume: "500", difficulty: "Low", opportunity: "High" },
        { keyword: "steakhouse Branson MO", volume: "700", difficulty: "Medium", opportunity: "Medium" },
        { keyword: "wine bar Branson", volume: "300", difficulty: "Low", opportunity: "High" },
        { keyword: "craft cocktails Branson", volume: "250", difficulty: "Low", opportunity: "Very High" },
        { keyword: "seasonal menu restaurant", volume: "400", difficulty: "Medium", opportunity: "High" },
      ],
      events: [
        { keyword: "private dining Branson", volume: "200", difficulty: "Low", opportunity: "Very High" },
        { keyword: "wedding venue Branson MO", volume: "800", difficulty: "High", opportunity: "Medium" },
        { keyword: "corporate catering Branson", volume: "150", difficulty: "Low", opportunity: "High" },
        { keyword: "wine tasting events Branson", volume: "100", difficulty: "Low", opportunity: "Very High" },
        { keyword: "cooking classes Branson", volume: "80", difficulty: "Low", opportunity: "Very High" },
      ],
    }

    const handleGenerate = () => {
      setGeneratingKeywords(true)
      setTimeout(() => {
        setGeneratedContent({
          ...generatedContent,
          keywords: sampleKeywords[selectedFocus],
        })
        setGeneratingKeywords(false)
      }, 2500)
    }

    const getOpportunityColor = (opportunity) => {
      switch (opportunity) {
        case "Very High":
          return "text-green-600 bg-green-100"
        case "High":
          return "text-blue-600 bg-blue-100"
        case "Medium":
          return "text-yellow-600 bg-yellow-100"
        default:
          return "text-gray-600 bg-gray-100"
      }
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Local SEO Keyword Optimizer</h2>
          <p className="text-gray-600">Discover the keywords that will bring local customers to your door</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Keyword Focus</h3>
            <div className="flex space-x-2">
              {["local", "cuisine", "events"].map((focus) => (
                <button
                  key={focus}
                  onClick={() => setSelectedFocus(focus)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFocus === focus ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {focus.charAt(0).toUpperCase() + focus.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generatingKeywords}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {generatingKeywords ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Keywords...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Find {selectedFocus.charAt(0).toUpperCase() + selectedFocus.slice(1)} Keywords</span>
              </>
            )}
          </button>
        </div>

        {generatedContent.keywords && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Keyword Opportunities</h3>
              <p className="text-sm text-gray-600">Keywords ranked by opportunity score for {businessInfo.name}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Volume
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opportunity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {generatedContent.keywords.map((keyword, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{keyword.keyword}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{keyword.volume}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{keyword.difficulty}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOpportunityColor(keyword.opportunity)}`}
                        >
                          {keyword.opportunity}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                          Target This
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render the appropriate component based on current step
  const renderStepComponent = () => {
    switch (currentStepData.component) {
      case "WelcomeStep":
        return <WelcomeStep />
      case "SocialMediaGenerator":
        return <SocialMediaGenerator />
      case "HeadlineCreator":
        return <HeadlineCreator />
      case "WebsiteCopyGenerator":
        return <WebsiteCopyGenerator />
      case "SEOOptimizer":
        return <SEOOptimizer />
      default:
        return <div>Component not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Demo for {businessInfo.name}</h1>
                <p className="text-sm text-gray-500">
                  {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {currentSteps.length}: {currentStepData.title}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
          <div className="p-8">{renderStepComponent()}</div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {currentSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-blue-600" : index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextStep}
              disabled={currentStep === currentSteps.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDemoInterface
