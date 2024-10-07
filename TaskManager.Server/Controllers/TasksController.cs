using Microsoft.AspNetCore.Mvc;
using TaskManager.Server.Data;
using TaskManager.Server.Models;
using TaskManager.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskDbContext _context;
        private readonly SentimentAnalysisService _sentimentService;

        public TasksController(TaskDbContext context, SentimentAnalysisService sentimentService)
        {
            _context = context;
            _sentimentService = sentimentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks.Include(t => t.Notes).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        [HttpPost("{id}/notes")]
        public async Task<ActionResult> AddNoteToTask(int id, [FromBody] Note note)
        {
            var task = await _context.Tasks.Include(t => t.Notes).FirstOrDefaultAsync(t => t.Id == id);
            if (task == null) return NotFound();

            // Add note to task
            note.CreatedAt = DateTime.Now;
            task.Notes.Add(note);

            // Analyze sentiment using Python and update task priority
            var sentiment = _sentimentService.AnalyzeSentiment(note.Content);
            task.Priority = sentiment;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }



}
