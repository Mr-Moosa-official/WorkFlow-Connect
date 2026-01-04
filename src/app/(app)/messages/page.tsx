import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { conversations, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { SendHorizonal, Search } from "lucide-react";

export default function MessagesPage() {
    const currentUser = users[0]; // mock current user
    const currentConversation = conversations[0];
    const otherUser = users.find(u => u.id === currentConversation.userId);
    const otherUserImage = otherUser ? PlaceHolderImages.find(img => img.id === otherUser.avatar) : undefined;
    
    return (
        <div className="h-[calc(100vh-4rem)] flex">
            <div className="hidden md:flex flex-col w-1/3 border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-10" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    {conversations.map(conv => {
                        const user = users.find(u => u.id === conv.userId);
                        if (!user) return null;
                        const userImage = PlaceHolderImages.find(img => img.id === user.avatar);
                        const lastMessage = conv.messages[conv.messages.length - 1];

                        return (
                            <div key={conv.id} className={cn(
                                "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50",
                                conv.id === currentConversation.id && "bg-muted"
                                )}>
                                <Avatar>
                                    {userImage && <AvatarImage src={userImage.imageUrl} />}
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 truncate">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{lastMessage?.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </div>
            <div className="flex flex-col flex-1">
                {otherUser && (
                     <div className="flex items-center gap-4 p-4 border-b">
                        <Avatar>
                            {otherUserImage && <AvatarImage src={otherUserImage.imageUrl} />}
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{otherUser.name}</p>
                            <p className="text-sm text-muted-foreground">{otherUser.title}</p>
                        </div>
                    </div>
                )}
               
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        {currentConversation.messages.map(message => (
                            <div key={message.id} className={cn(
                                "flex gap-3",
                                message.senderId === currentUser.id ? "justify-end" : "justify-start"
                            )}>
                                {message.senderId !== currentUser.id && otherUser && (
                                     <Avatar className="h-8 w-8">
                                         {otherUserImage && <AvatarImage src={otherUserImage.imageUrl} />}
                                         <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                                     </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-xs lg:max-w-md p-3 rounded-lg",
                                    message.senderId === currentUser.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12" />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                            <SendHorizonal className="h-5 w-5 text-primary"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
