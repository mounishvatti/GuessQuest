import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  login as loginAction,
  register as registerAction,
} from "../store/slices/authSlice";
import * as authService from "@/services/authService";
import { toast } from "sonner";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { useState } from "react";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(username, password);
      if (response.success && response.user && response.token) {
        dispatch(loginAction({ user: response.user, token: response.token }));
        toast.success(`Welcome back, ${response.user.username}!`);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register(username, password);
      if (response.success && response.user && response.token) {
        dispatch(
          registerAction({ user: response.user, token: response.token })
        );
        toast.success(`Welcome, ${response.user.username}!`);
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-light tracking-tight">
              Number Quest
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to play and track your scores
            </CardDescription>
          </CardHeader>
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "login" | "register")
            }
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></span>
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn size={18} />
                        Login
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/50"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></span>
                        Registering...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus size={18} />
                        Register
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
