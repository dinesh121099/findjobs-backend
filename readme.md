## Routes:
## Authentication Routes (API documentaion)
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | Login and receive JWT     |

## User Profile Routes
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/api/user/me`   | Get current user's profile    |
| PUT    | `/api/user/me`   | Update current user's profile |

## Job Routes
| Method | Endpoint     | Description                  |
|--------|--------------|------------------------------|
| GET    | `/api/jobs/` | Get list of all job listings |

## AI Recommendation Route
| Method | Endpoint                  | Description                                        |
|--------|---------------------------|----------------------------------------------------|
| POST   | `/api/ai/recommendations` | Get AI-powered job recommendations (auth required) |

### AI Recommendation Flow explained in detail

1. **Frontend**
   - User clicks **“Find My Matches”** button.
   - Sends a `POST` request to `/api/ai/recommendations` with the JWT token.

2. **Backend** (aiController.js)
   - Extracts the logged-in user's profile from DB.
   - Uses `aiPromptBuilder.js` to format a natural-language prompt using profile data.

3. **OpenAI Call** (openaiService.js)
   - The prompt is sent to OpenAI’s `chat/completions` endpoint using GPT-3.5.
   - The response (a list of suggested job matches) is returned to the frontend.

4. **Frontend**
   - Receives the AI-curated job suggestions.
   - Renders them in a clean card layout.

## Example prompt sent to AI:
    'User Profile:
    Name: Jane Doe
    Location: Mumbai
    Experience: 3 years
    Skills: React, Node.js, MongoDB
    Preferred Job Type: remote
    Jobs List:
    - Full Stack Developer at ABC Corp, Mumbai (Skills: React, Node.js, MongoDB)
    - Frontend Engineer at XYZ Ltd, Remote (Skills: React, Vue, CSS)
    - Backend Developer at InnoTech, Bengaluru (Skills: Node.js, Express, MongoDB)
    Based on the profile and job listings above, return the top 3 most relevant job matches in JSON format.'

## Trade-offs & Assumptions
 **Trade-offs**
    - No admin panel for managing job listings — jobs are either seeded manually or fetched from DB.
    - No resume parsing or advanced filtering — the project is kept intentionally minimal to showcase AI matching and full-stack architecture.

 **Assumptions**
    - Users always fill in meaningful skills and experience for better recommendations.
    - AI API returns useful, structured suggestions — no secondary parsing is applied to validate structure.
    - Frontend will send the JWT in every request's header (for protected routes).

## Tools used: 
- Postman (testing backend)
- Mongodb compass (database visualization)

## Further enhancement ideas:
- Role-based access (admin can post jobs)
- Resume upload and NLP parsing via AI
- Feedback loop to rate AI suggestions
- Filtering and sorting of job listings

## MVC arcitecture used:
- Folderstructure:

        Findjobs-backend/
        ├── controllers/
        │   ├── authController.js        # Register/Login
        │   ├── userController.js        # Get/Update user profile
        │   ├── jobController.js         # Get jobs
        │   └── aiController.js          # AI integration endpoint
        │
        ├── routes/
        │   ├── authRoutes.js
        │   ├── userRoutes.js
        │   ├── jobRoutes.js
        │   └── aiRoutes.js
        │
        ├── middleware/
        │   └── authMiddleware.js        # JWT verification
        │
        ├── models/
        │   ├── User.js
        │   └── Job.js
        │
        ├── utils/
        │   ├── aiPromptBuilder.js       # Builds prompt for OpenAI
        │   └── openaiService.js         # Handles API call to OpenAI
        │
        ├── .env
        ├── server.js
        └── package.json
