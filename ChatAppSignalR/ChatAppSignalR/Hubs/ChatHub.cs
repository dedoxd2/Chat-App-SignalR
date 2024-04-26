using ChatAppSignalR.DataService;
using ChatAppSignalR.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatAppSignalR.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;
        public ChatHub(SharedDb shared)
        {
            _shared = shared;   
        }
        public async Task JoinChat(UserConnection conn)
        {

            Console.WriteLine($"{conn.UserName} has joined");
            await Clients.All.SendAsync("ReceiveMessage" , "admin" , $"{conn.UserName} has joined");
        }


        /*public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            await Clients.Group(conn.ChatRoom).SendAsync("ReceiveMessage", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
        }
*/
        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            _shared.connections[Context.ConnectionId] = conn;

            await Clients.Group(conn.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin", $"{conn.UserName} has joined {conn.ChatRoom}");
        }


        public async Task SendMessage(string msg)
        {
            if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessageMessage", conn.UserName, msg);
            }
        }
    }
}
