/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:  09 May 2023
; Modified-By: Yakut Ahmedin
; Description: Team Shcema
;===========================================
*/
import express from "express";
import Team from "../models/ahmedin-team.js";

const router = express.Router();
/**
 * @openapi
 * tags:
 *   name: Teams
 */

/**
 * @openapi
 * /api/teams:
 *   get:
 *     summary: Returns lists of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Array of team documents
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Get a list of all Teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     summary: Assign player to a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of team to assign player
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Player document
 *       400:
 *         description: Invalid teamId
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Assign player to team
router.post("/:id/players", async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id });
    if (!team) {
      return res.status(401).json({ message: "Invalid teamId" });
    }

    // Create a new player object from the request body
    const newPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      salary: req.body.salary,
    };

    // Add the new player to the players array of the team object
    team.players.push(newPlayer);

    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     summary: Find all players by team id
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the team to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of player documents
 *       400:
 *         description: Invalid teamId
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */
// Get all players by team ID
router.get("/:id/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json(team.players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete a team by Id
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the team to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team document
 *       400:
 *         description: Invalid teamId
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Delete Team By Id
router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(401).json({ message: "Invalid teamId" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
