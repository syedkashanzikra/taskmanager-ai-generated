using System.ComponentModel.DataAnnotations;

namespace TaskManager.Server.Models
{

    public class TaskItem
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; } 
        public List<Note> Notes { get; set; } = new List<Note>();
    }

}
