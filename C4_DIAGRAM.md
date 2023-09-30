# event-management-project
@startuml Diagrama_Contexto

!include  https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

LAYOUT_WITH_LEGEND()

title Diagrama de Contexto Proyecto Recursos Humanos

Person(administrador, "Administrador", "Personal infraestructura que realiza administracion de usuarios y permisos.")
Person(jefe_rrhh, "Jefe-RRHH", "Personal que realiza administracion de las unidades organizacionales. ")
Person(usuario, "USUARIO GENERAL", "Usuario general.")


System(proyecto_rrhh, "SISTEMA DE RECURSOS HUMANOS ", "proyecto AGETIC")

System_Ext(mensajeria, "MENSAJERIA", "Plataforma de Mensajeria.")

Rel(administrador, proyecto_rrhh, "Usa")
Rel(jefe_rrhh, proyecto_rrhh, "Usa")
Rel(usuario, proyecto_rrhh, "Usa")

Rel(proyecto_rrhh, mensajeria, "Rest")

@enduml
