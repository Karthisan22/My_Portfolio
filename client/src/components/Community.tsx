import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCommunityMessageSchema, insertFeedbackSchema, type CommunityMessage, type Feedback } from "@shared/schema";
import { z } from "zod";
import { MessageCircle, Send, Star, Users, Heart, ThumbsUp, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type CommunityMessageFormData = z.infer<typeof insertCommunityMessageSchema>;
type FeedbackFormData = z.infer<typeof insertFeedbackSchema>;

export default function Community() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"chat" | "feedback">("chat");
  const [selectedRating, setSelectedRating] = useState(5);

  // Community Messages
  const {
    register: registerMessage,
    handleSubmit: handleSubmitMessage,
    reset: resetMessage,
    formState: { errors: messageErrors }
  } = useForm<CommunityMessageFormData>({
    resolver: zodResolver(insertCommunityMessageSchema),
    defaultValues: {
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
    }
  });

  // Feedback Form
  const {
    register: registerFeedback,
    handleSubmit: handleSubmitFeedback,
    reset: resetFeedback,
    setValue: setFeedbackValue,
    formState: { errors: feedbackErrors }
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      rating: 5
    }
  });

  // Fetch community messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/community/messages"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/community/messages");
      return response.json() as Promise<CommunityMessage[]>;
    }
  });

  // Fetch feedback
  const { data: feedbacks = [], isLoading: feedbacksLoading } = useQuery({
    queryKey: ["/api/feedback"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/feedback");
      return response.json() as Promise<Feedback[]>;
    }
  });

  // Post community message
  const messageMutation = useMutation({
    mutationFn: async (data: CommunityMessageFormData) => {
      const response = await apiRequest("POST", "/api/community/messages", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message posted!",
        description: "Your message has been shared with the community.",
      });
      resetMessage();
      queryClient.invalidateQueries({ queryKey: ["/api/community/messages"] });
    },
    onError: () => {
      toast({
        title: "Failed to post message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Submit feedback
  const feedbackMutation = useMutation({
    mutationFn: async (data: FeedbackFormData) => {
      const response = await apiRequest("POST", "/api/feedback", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your valuable feedback.",
      });
      resetFeedback();
      setSelectedRating(5);
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
    },
    onError: () => {
      toast({
        title: "Failed to submit feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmitMessage = (data: CommunityMessageFormData) => {
    messageMutation.mutate(data);
  };

  const onSubmitFeedback = (data: FeedbackFormData) => {
    feedbackMutation.mutate({ ...data, rating: selectedRating });
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setFeedbackValue("rating", rating);
  };

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length).toFixed(1)
    : "0.0";

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Community & Feedback</h2>
          <p className="text-slate-600 text-lg">Connect with visitors and share your thoughts</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <MessageCircle className="text-primary mr-2" size={24} />
                <span className="text-2xl font-bold text-slate-900">{messages.length}</span>
              </div>
              <p className="text-slate-600">Community Messages</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-secondary/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="text-yellow-500 mr-2" size={24} />
                <span className="text-2xl font-bold text-slate-900">{averageRating}</span>
              </div>
              <p className="text-slate-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-purple-300/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="text-purple-500 mr-2" size={24} />
                <span className="text-2xl font-bold text-slate-900">{feedbacks.length}</span>
              </div>
              <p className="text-slate-600">Total Feedback</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 border border-slate-200">
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              onClick={() => setActiveTab("chat")}
              className="rounded-full px-6"
            >
              <MessageCircle className="mr-2" size={16} />
              Community Chat
            </Button>
            <Button
              variant={activeTab === "feedback" ? "default" : "ghost"}
              onClick={() => setActiveTab("feedback")}
              className="rounded-full px-6"
            >
              <Star className="mr-2" size={16} />
              Feedback
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {activeTab === "chat" ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Chat Messages */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <MessageCircle className="mr-2 text-primary" size={20} />
                    Recent Messages
                  </h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messagesLoading ? (
                      <div className="text-center py-8 text-slate-500">Loading messages...</div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">No messages yet. Be the first to say something!</div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className="flex space-x-3 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                          <img
                            src={message.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"}
                            alt={message.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-slate-900">{message.name}</span>
                              <span className="text-xs text-slate-500 flex items-center">
                                <Clock className="mr-1" size={12} />
                                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-slate-700">{message.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Post Message */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <Send className="mr-2 text-secondary" size={20} />
                    Share Your Thoughts
                  </h3>
                  
                  <form onSubmit={handleSubmitMessage(onSubmitMessage)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        {...registerMessage("name")}
                        placeholder="Enter your name"
                        className={messageErrors.name ? "border-red-500" : ""}
                      />
                      {messageErrors.name && (
                        <p className="text-sm text-red-500">{messageErrors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        {...registerMessage("message")}
                        placeholder="Share your thoughts about the portfolio..."
                        rows={4}
                        className={messageErrors.message ? "border-red-500" : ""}
                      />
                      {messageErrors.message && (
                        <p className="text-sm text-red-500">{messageErrors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full hover:scale-105 transition-transform duration-300"
                      disabled={messageMutation.isPending}
                    >
                      {messageMutation.isPending ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="mr-2" size={16} />
                          Post Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Feedback Display */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <Star className="mr-2 text-yellow-500" size={20} />
                    Recent Feedback
                  </h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {feedbacksLoading ? (
                      <div className="text-center py-8 text-slate-500">Loading feedback...</div>
                    ) : feedbacks.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">No feedback yet. Be the first to leave a review!</div>
                    ) : (
                      feedbacks.map((feedback) => (
                        <div key={feedback.id} className="p-4 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-900">{feedback.name}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-700 mb-2">{feedback.comment}</p>
                          <span className="text-xs text-slate-500">
                            {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Feedback */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <Heart className="mr-2 text-red-500" size={20} />
                    Leave Feedback
                  </h3>
                  
                  <form onSubmit={handleSubmitFeedback(onSubmitFeedback)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedbackName">Your Name</Label>
                        <Input
                          id="feedbackName"
                          {...registerFeedback("name")}
                          placeholder="Enter your name"
                          className={feedbackErrors.name ? "border-red-500" : ""}
                        />
                        {feedbackErrors.name && (
                          <p className="text-sm text-red-500">{feedbackErrors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedbackEmail">Email</Label>
                        <Input
                          id="feedbackEmail"
                          type="email"
                          {...registerFeedback("email")}
                          placeholder="your@email.com"
                          className={feedbackErrors.email ? "border-red-500" : ""}
                        />
                        {feedbackErrors.email && (
                          <p className="text-sm text-red-500">{feedbackErrors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= selectedRating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-slate-600">({selectedRating}/5)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="comment"
                        {...registerFeedback("comment")}
                        placeholder="Share your thoughts about the portfolio..."
                        rows={4}
                        className={feedbackErrors.comment ? "border-red-500" : ""}
                      />
                      {feedbackErrors.comment && (
                        <p className="text-sm text-red-500">{feedbackErrors.comment.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full hover:scale-105 transition-transform duration-300"
                      disabled={feedbackMutation.isPending}
                    >
                      {feedbackMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <ThumbsUp className="mr-2" size={16} />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}