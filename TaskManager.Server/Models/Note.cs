namespace TaskManager.Server.Models
{
   
    public class Note
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public int TaskItemId { get; set; }
        public TaskItem TaskItem { get; set; }
    }

}
