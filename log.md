# Stream Collaboration
\color{red} \small <p style="color:red;"><b>  This document is incomplete. I will work on it over time and remove this notice when finished.   \color{black} \normalsize </b></p>

This paper explains how to use streams to collaborate on a logical map.  See the Logical Map How-to Guide (\ada)[@h_logical_2025] for details.  Review Triple System Analysis (\tsa)[@h_triple_2023] for an orientation on triples and how they relate.  For a practical example, see Adaptive Analysis(\trs)[@h_adaptive_2024].  As you read this paper, if you don't understand the ideas, go back to these papers as a reference.  I will recap important points, but will assume the reader either has a similar background are will review these.

The primary goal for most of my work is to avoid servers, experts, and administrators; however, collaboration, particularly with real-time visualization of changes, benefits from servers.  I try and keep this as simple as possible by using MQTT [@noauthor_mqtt_nodate].  I provide local options, as well as use publicly available, free servers.  I focus on work for the common good, primarily during crises, so the visualizations I imagine are public.  Security is not a huge issue in this case, with one exception.  My only worry is the Highway Man problem [@the_highwaymen_highwaymen_2013].  As an example, if potable water resources and relations are mapped, and bad agents are able to manipulate the information, it might lead to a location of ambush.  I spend quite a bit of time addressing that problem, and mitigate the risk with some example technical solutions.

Triples are small facts used with an open-world assumption that can be merged together.  Imagine two isolated groups of people are working on soup kitchen models.  One group might use the term ladle, and another group might use the word spoon to serve the soup.  Within the groups, this is completely valid.  There is no requirement to conform to an overarching schema.  If it matters, it is possible to weave these two ideas together without breaking the original work.  It is tempting to fall back to established ontologies, including upper level, to solve the resulting conflicts.  I resist ontologies tailored for machine cognition; however, I acknowledge that extensibility to those ontologies is sometimes a priority.  Charles Peirce, the inventor of triples in the sense I mean, lived in the 1800s, so he certainly didn't rely on machine cognition;however, I'm not aware of any modern work that integrates systems and triples that uses ontologies without expecting machine cognition. [@bergman_knowledge_2018.]  

# References

<div id="refs"></div>

\newpage

\

\newpage
